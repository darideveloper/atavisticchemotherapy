import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// SSR-safe plugin registration + config (GSAP touches `window` —
// keep everything inside the guard; Astro imports this module during SSR)
if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger)

	// ScrollTrigger performance tuning
	ScrollTrigger.config({
		limitCallbacks: true,
		ignoreMobileResize: true,
	})

	// Global tween defaults
	gsap.defaults({
		ease: 'power4.out',
		duration: 1.2,
	})

	// Re-measure triggers when images, fonts, and lazy content settle
	window.addEventListener('load', () => ScrollTrigger.refresh())
}

export { gsap, ScrollTrigger }