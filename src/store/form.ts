import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { z } from 'zod'

// 1. Zod schemas
const contactSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email'),
	phone: z.string().min(7, 'Invalid phone'),
	message: z.string().optional(),
})

// 2. Build union type
export type FormValues = z.infer<typeof contactSchema>

// Auto-build field → schema map (enforces unique field names across schemas)
export function buildFieldSchemaMap(schemas: z.ZodObject<any>[]): Map<string, z.ZodTypeAny> {
	const map = new Map<string, z.ZodTypeAny>()
	for (const schema of schemas) {
		for (const [field, fieldSchema] of Object.entries(schema.shape)) {
			if (map.has(field)) {
				throw new Error(`Field "${field}" appears in multiple schemas. Field names must be unique.`)
			}
			map.set(field, fieldSchema as z.ZodTypeAny)
		}
	}
	return map
}

export const fieldSchemaMap = buildFieldSchemaMap([contactSchema])

export interface FormStore extends FormValues {
	errors: Record<string, string>
	isLoading: boolean
	setField: (field: string, value: unknown) => void
	validateAll: () => boolean
	reset: () => void
}

export const initialState: FormValues & { isLoading: boolean } = {
	name: '',
	email: '',
	phone: '',
	message: '',
	isLoading: false,
}

export function getNestedValue(
	obj: Record<string, unknown>,
	path: string,
): unknown {
	return path.split('.').reduce<unknown>((acc, key) => {
		if (acc == null || typeof acc !== 'object') return undefined
		return (acc as Record<string, unknown>)[key]
	}, obj)
}

export function setNestedValue(
	obj: Record<string, unknown>,
	path: string,
	value: unknown,
): void {
	const keys = path.split('.')
	const last = keys.pop() as string
	let target = obj
	for (const key of keys) {
		if (typeof target[key] !== 'object' || target[key] === null) target[key] = {}
		target = target[key] as Record<string, unknown>
	}
	target[last] = value
}

// 3. Create store
export const useFormStore = create<FormStore>()(
	persist(
		(set, get) => ({
			...initialState,
			errors: {},

			setField: (field: string, value: unknown) => {
				const fieldSchema = fieldSchemaMap.get(field)
				set((state) => {
					const newErrors = { ...state.errors }
					if (fieldSchema) {
						const validation = fieldSchema.safeParse(value)
						if (!validation.success) {
							newErrors[field] = validation.error.issues[0]?.message
						} else {
							delete newErrors[field]
						}
					}
					if (field.includes('.')) {
						const next = structuredClone(state)
						setNestedValue(next as unknown as Record<string, unknown>, field, value)
						return { ...next, errors: newErrors }
					}
					return { ...state, [field]: value, errors: newErrors }
				})
			},

			validateAll: () => {
				const state = get()
				const allErrors: Record<string, string> = {}
				for (const [fieldName, schema] of fieldSchemaMap) {
					const value = fieldName.includes('.')
						? getNestedValue(state as unknown as Record<string, unknown>, fieldName)
						: state[fieldName as keyof typeof state]
					const result = schema.safeParse(value)
					if (!result.success) {
						allErrors[fieldName] = result.error.issues[0]?.message
					}
				}
				set({ errors: allErrors })
				return Object.keys(allErrors).length === 0
			},

			reset: () => set({ ...initialState, errors: {} }),
		}),
		{
			name: 'app-form-storage',
			partialize: (state) => {
				const { errors, isLoading, ...rest } = state // don't persist transient state
				return rest
			},
		},
	),
)