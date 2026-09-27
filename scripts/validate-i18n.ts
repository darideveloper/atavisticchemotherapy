// Mandatory build-time validation: every src/messages/*.json must share the
// same dotted key set (N-lang). Fails the build on mismatch.
import fs from 'node:fs'
import path from 'node:path'

const messagesDir = path.resolve('src/messages')

const readMessages = (file: string) => {
	const filePath = path.join(messagesDir, file)
	if (!fs.existsSync(filePath)) {
		console.error(`❌ Message file not found: ${filePath}`)
		process.exit(1)
	}
	const content = fs.readFileSync(filePath, 'utf-8')
	try {
		return JSON.parse(content)
	} catch (e) {
		console.error(`❌ Invalid JSON in ${filePath}`)
		process.exit(1)
	}
}

const flattenKeys = (obj: any, prefix = ''): string[] => {
	return Object.keys(obj).reduce((acc: string[], key: string) => {
		const value = obj[key]
		const newKey = prefix ? `${prefix}.${key}` : key
		if (typeof value === 'object' && value !== null) {
			return [...acc, ...flattenKeys(value, newKey)]
		}
		return [...acc, newKey]
	}, [])
}

const messageFiles = fs.readdirSync(messagesDir).filter((f) => f.endsWith('.json'))
if (messageFiles.length === 0) {
	console.error('❌ No message files found in src/messages')
	process.exit(1)
}

const keySets = new Map(
	messageFiles.map((f) => [f, new Set(flattenKeys(readMessages(f)))]) as [string, Set<string>][],
)
const referenceName = 'en.json'
const reference = keySets.get(referenceName) ?? [...keySets.values()][0]
const referenceLabel = keySets.has(referenceName) ? referenceName : messageFiles[0]

let ok = true
for (const [file, keys] of keySets) {
	const missing = [...reference].filter((k) => !keys.has(k))
	const extra = [...keys].filter((k) => !reference.has(k))
	if (missing.length > 0 || extra.length > 0) {
		ok = false
		console.error(`❌ i18n validation failed! ${file} is out of sync with ${referenceLabel}.`)
		missing.slice(0, 20).forEach((k) => console.error(`  missing: ${k}`))
		extra.slice(0, 20).forEach((k) => console.error(`  extra: ${k}`))
	}
}

if (!ok) {
	process.exit(1)
} else {
	console.log('✅ i18n validation passed! All message files are in sync.')
}