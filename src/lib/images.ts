// SSG image transforms for astro:assets. This module owns the transform
// constants and slot map — the only place that reasons about widths/qualities.
import { getImage, type ImageMetadata } from 'astro:assets'

// Quality floor (max compression with QA on detail).
export const AVIF_QUALITY = 55
export const WEBP_QUALITY = 78

export interface ImageSlot {
	widths: number[]
	sizes: string
}

// Every slot pairs candidate pixel WIDTHS with a matching SIZES media-string.
// The invariant: `sizes` MUST match the rendered CSS slot, or the browser
// picks the wrong bytes.
export const IMAGE_SLOTS = {
	grid: { widths: [400, 800, 1200], sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw' },
	heroFull: { widths: [960, 1600, 2400], sizes: '100vw' },
	portrait: { widths: [360, 720, 1080], sizes: '(max-width: 1024px) 100vw, 360px' },
	logo: { widths: [180, 360, 540], sizes: '180px' },
	testimonial: { widths: [320, 640, 960], sizes: '(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(50vw - 1.5rem), 384px' },
} satisfies Record<string, ImageSlot>

export type ImageSlotName = keyof typeof IMAGE_SLOTS

export interface LcpPreload {
	srcSet: string
	sizes: string
}
export interface SlideSet {
	avifSrcSet: string
	webpSrcSet: string
	fallbackSrc: string
	width: number
	height: number
	sizes: string
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/** Build a single AVIF responsive srcset for an LCP/hero preload. Returns null on failure. */
export async function lcpPreload(src: string, slot: ImageSlot): Promise<LcpPreload | null> {
	for (let attempt = 0; attempt < 4; attempt++) {
		try {
			const img = await getImage({ src, inferSize: true, widths: slot.widths, format: 'avif', quality: AVIF_QUALITY })
			const srcSet = img.srcSet.attribute
			if (!srcSet) return null
			return { srcSet, sizes: slot.sizes }
		} catch {
			if (attempt < 3) await sleep(250 * (attempt + 1))
		}
	}
	return null
}

/** Build an AVIF+WebP set for a React island (which can't render .astro atoms). */
export async function slideSet(src: string | ImageMetadata, slot: ImageSlot): Promise<SlideSet | null> {
	for (let attempt = 0; attempt < 4; attempt++) {
		try {
			const base = typeof src === 'string' ? { src, inferSize: true } : { src }
			const [avif, webp] = await Promise.all([
				getImage({ ...base, widths: slot.widths, format: 'avif', quality: AVIF_QUALITY }),
				getImage({ ...base, widths: slot.widths, format: 'webp', quality: WEBP_QUALITY }),
			])
			if (avif.srcSet.attribute && webp.srcSet.attribute) {
				return {
					avifSrcSet: avif.srcSet.attribute,
					webpSrcSet: webp.srcSet.attribute,
					fallbackSrc: webp.src,
					width: webp.attributes.width,
					height: webp.attributes.height,
					sizes: slot.sizes,
				}
			}
		} catch {
			if (attempt < 3) await sleep(250 * (attempt + 1))
		}
	}
	return null
}
