import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const SRC_ROOT = fileURLToPath(new URL('..', import.meta.url))
const THIS_FILE = fileURLToPath(import.meta.url)
const EXTENSIONS = new Set(['.astro', '.ts', '.tsx', '.json', '.md'])

const UNACCENTED = /atavistica|Atavistica|ATAVISTICA|atavistico|Atavistico|ATAVISTICO|atávica|Atávica/
const ACCENTED = /atavística|Atavística|ATAVÍSTICA|atavístico|Atavístico|ATAVÍSTICO/

function walk(dir: string): string[] {
	const out: string[] = []
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry)
		if (statSync(full).isDirectory()) out.push(...walk(full))
		else out.push(full)
	}
	return out
}

test('no unaccented Spanish treatment spelling remains under src/', () => {
	const offenders: string[] = []
	let accentedFound = 0

	for (const file of walk(SRC_ROOT)) {
		if (file === THIS_FILE) continue
		if (!EXTENSIONS.has(file.slice(file.lastIndexOf('.')))) continue
		const text = readFileSync(file, 'utf8')
		accentedFound += (text.match(ACCENTED) ?? []).length
		for (const match of text.match(UNACCENTED) ?? []) {
			offenders.push(`${relative(SRC_ROOT, file)}: ${match}`)
		}
	}

	assert.deepEqual(
		offenders,
		[],
		`Unaccented treatment spellings found (use the accented canonical form):\n${offenders.join('\n')}`,
	)
	assert.ok(accentedFound > 0, 'expected the accented canonical form to appear somewhere in src/')
})
