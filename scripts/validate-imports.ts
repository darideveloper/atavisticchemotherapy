// Enforces the `@/` path alias across src/**/*.{astro,ts,tsx}.
// Bans single-dot and parent relative project imports. Exits 1 on offenders.
import fs from 'node:fs'
import path from 'node:path'

const SRC = path.resolve('src')
const EXTENSIONS = new Set(['.astro', '.ts', '.tsx'])

function listFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return listFiles(full)
    return EXTENSIONS.has(path.extname(entry.name)) ? [full] : []
  })
}

// Match relative project imports: from './...', from '../...',
// import('./...'), bare import './...'
const IMPORT_RE = /(?:from\s+|import\s*\()\s*['"](\.[^'"]+)['"]|(?:^|\n)\s*import\s+['"](\.[^'"]+)['"]/g

const offenders: string[] = []

for (const file of listFiles(SRC)) {
  const text = fs.readFileSync(file, 'utf-8')
  IMPORT_RE.lastIndex = 0
  let m
  while ((m = IMPORT_RE.exec(text)) !== null) {
    const rel = m[1] ?? m[2]
    offenders.push(`${path.relative(process.cwd(), file)}: "${rel}"`)
  }
}

if (offenders.length > 0) {
  console.error('❌ validate-imports failed! Relative project imports found (use `@/` alias):')
  offenders.forEach((o) => console.error(`  - ${o}`))
  process.exit(1)
} else {
  console.log('✅ validate-imports passed! No relative project imports.')
}