// Mandatory build-time validation for the sole public language catalog.
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

const messageFiles = fs.readdirSync(messagesDir).filter((f) => f.endsWith('.json'))
if (messageFiles.length !== 1 || messageFiles[0] !== 'es.json') {
	console.error('❌ The Spanish-only site must contain exactly src/messages/es.json')
	process.exit(1)
}

readMessages('es.json')
console.log('✅ i18n validation passed! Spanish catalog is valid.')
