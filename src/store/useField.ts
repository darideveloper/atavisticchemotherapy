import { useFormStore } from '@/store/form'

export interface UseFieldResult {
	value: unknown
	error?: string
	setValue: (v: unknown) => void
	mounted: boolean
}

// Hydration-safe single-field binding, matching the vanilla-atom contract.
// Reads via getState() (works across SSR + client); `mounted` is true only on
// the client so SSR never renders persisted values (hydration-safe).
export function useField(field: string): UseFieldResult {
	const server = typeof window === 'undefined'

	const read = () => {
		try {
			const s = useFormStore.getState() as any
			return field.includes('.')
				? field.split('.').reduce((acc: any, k: string) => acc?.[k], s)
				: s[field]
		} catch {
			return undefined
		}
	}

	return {
		value: server ? undefined : read(),
		error: server ? undefined : (useFormStore.getState().errors?.[field] as string | undefined),
		setValue: (v) => {
			if (server) return
			useFormStore.getState().setField(field, v)
		},
		mounted: !server,
	}
}