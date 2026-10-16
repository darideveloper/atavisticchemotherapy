import type { SlideSet } from '@/lib/images';
import Carousel from '@/components/organisms/Carousel';

type DedicationSlide = Readonly<{ src: string; alt: string; set: SlideSet | null }>;
type Props = Readonly<{ slides: ReadonlyArray<DedicationSlide> }>;

export default function DedicationCarousel({ slides }: Props) {
  return (
    <Carousel
      items={slides}
      ariaLabel="Fotografías de la dedicatoria"
      autoplay={{ delay: 8000 }}
      className="max-w-md"
      responsiveFallback={false}
      controlLabels={{ previous: 'Fotografía anterior', next: 'Siguiente fotografía' }}
      renderItem={(slide) => (
        <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl group">
          {slide.set ? (
            <picture className="block h-auto w-full">
              <source type="image/avif" srcSet={slide.set.avifSrcSet} sizes={slide.set.sizes} />
              <source type="image/webp" srcSet={slide.set.webpSrcSet} sizes={slide.set.sizes} />
              <img src={slide.set.fallbackSrc} alt={slide.alt} width={slide.set.width} height={slide.set.height} sizes={slide.set.sizes} loading="eager" decoding="async" className="h-auto w-full cursor-zoom-in transition duration-500 group-hover:scale-102" data-lightbox="" />
            </picture>
          ) : (
            <img src={slide.src} alt={slide.alt} loading="eager" decoding="async" className="h-auto w-full cursor-zoom-in transition duration-500 group-hover:scale-102" data-lightbox="" />
          )}
          <span className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-sm font-bold text-white" aria-hidden="true">⤢</span>
        </div>
      )}
    />
  );
}
