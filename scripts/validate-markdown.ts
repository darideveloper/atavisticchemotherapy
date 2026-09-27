// Flags leftover literal `**` markers in built HTML. Strict fail-build.
import fs from 'node:fs'
import path from 'node:path'

const distDir = path.resolve('dist')

function listHtml(dir: string): string[] {
	if (!fs.existsSync(dir)) return []
	return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = path.join(dir, entry.name)
		if (entry.isDirectory()) return listHtml(full)
		return full.endsWith('.html') ? [full] : []
	})
}

function stripBlocks(html: string): string {
	return html
		.replace(/<script[\s\S]*?<\/script>/gi, '')
		.replace(/<style[\s\S]*?<\/style>/gi, '')
		.replace(/<pre[\s\S]*?<\/pre>/gi, '')
		.replace(/<code[\s\S]*?<\/code>/gi, '')
}

const flagged: string[] = []
for (const file of listHtml(distDir)) {
	const raw = fs.readFileSync(file, 'utf-8')
	const text = stripBlocks(raw)
	const rel = path.relative(process.cwd(), file)
	const seen = new Set<string>()
	for (const m of text.matchAll(/\*\*/g)) {
		const i = m.index ?? 0
		const snip = text.slice(Math.max(0, i - 60), i + 60).replace(/\s+/g, ' ').trim()
		if (!seen.has(snip)) {
			seen.add(snip)
			flagged.push(`${rel}  …${snip}…`)
			if (seen.size >= 3) break
		}
	}
}

if (flagged.length > 0) {
	console.error('❌ Leftover literal `**` markers found in built HTML:')
	flagged.forEach((line) => console.error(`  - ${line}`))
	console.error('  Fix the content source text (stray `**`), not the renderer.')
	process.exit(1)
} else {
	console.log('✅ Markdown validation passed! No leftover `**` markers in built HTML.')
}