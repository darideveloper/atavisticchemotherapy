import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const legal = defineCollection({
	loader: glob({
		pattern: '**/*.md',
		base: './src/content/legal',
		generateId: ({ entry }) => entry.replace(/\.md$/, ''), // "<slug>.<lang>"
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		updated: z.string(),
	}),
})

export const collections = { legal }