import * as React from 'react'
import { Input } from '@/components/atoms/Input'
import { useFormStore } from '@/store/form'

export default function FormDemo() {
	const errors = useFormStore.getState().errors
	const isLoading = useFormStore.getState().isLoading

	return (
		<form
			className="form-demo"
			onSubmit={(e) => {
				e.preventDefault()
				const ok = useFormStore.getState().validateAll()
				if (ok) useFormStore.setState({ isLoading: true })
			}}
		>
			<Input field="name" label="Name" placeholder="Your name" />
			<Input field="email" label="Email" type="email" placeholder="you@example.com" />
			{errors['name'] && <small className="error">{errors['name']}</small>}
			{errors['email'] && <small className="error">{errors['email']}</small>}
			<button type="submit">Validate</button>
			{isLoading && <p>Submitted (state persisted to localStorage)</p>}
		</form>
	)
}