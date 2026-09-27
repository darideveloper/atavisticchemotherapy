import * as React from 'react'

interface DemoIslandProps {
	label?: string
	children?: React.ReactNode
}

export default function DemoIsland({ label = 'Clicks: ', children }: DemoIslandProps) {
	const [count, setCount] = React.useState(0)
	return (
		<div className="demo-island">
			<p className="static-content">{children}</p>
			<button data-demo onClick={() => setCount(count + 1)}>
				{label}
				{count}
			</button>
		</div>
	)
}