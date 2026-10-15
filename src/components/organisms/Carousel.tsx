import { useEffect, useRef } from 'react';
import { A11y, Autoplay, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import type { ReactNode } from 'react';
import 'swiper/css';

type AutoplayOptions = Readonly<{ delay: number; maxWidth?: number }>;

type CarouselProps<T> = Readonly<{
  items: ReadonlyArray<T>;
  renderItem: (item: T, index: number) => ReactNode;
  ariaLabel: string;
  autoplay?: AutoplayOptions;
  slidesPerView?: number;
  breakpoints?: Record<number, { slidesPerView: number }>;
  spaceBetween?: number;
  className?: string;
  slideClassName?: string;
  responsiveFallback?: boolean;
  controlLabels?: Readonly<{ previous: string; next: string }>;
}>;

function syncAutoplay(swiper: SwiperInstance, autoplay?: AutoplayOptions) {
  if (!autoplay) return;
  const isOutsideAutoplayRange = autoplay.maxWidth !== undefined && window.matchMedia(`(min-width: ${autoplay.maxWidth}px)`).matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isOutsideAutoplayRange || prefersReducedMotion) swiper.autoplay.stop();
  else swiper.autoplay.start();
}

export default function Carousel<T>({
  items,
  renderItem,
  ariaLabel,
  autoplay,
  slidesPerView = 1,
  breakpoints,
  spaceBetween = 16,
  className = '',
  slideClassName = '',
  responsiveFallback = true,
  controlLabels = { previous: 'Anterior', next: 'Siguiente' },
}: CarouselProps<T>) {
  const swiperRef = useRef<SwiperInstance | null>(null);

  useEffect(() => {
    if (!autoplay) return;
    const updateAutoplay = () => {
      if (swiperRef.current) syncAutoplay(swiperRef.current, autoplay);
    };
    updateAutoplay();
    window.addEventListener('resize', updateAutoplay);
    return () => window.removeEventListener('resize', updateAutoplay);
  }, [autoplay]);

  return (
    <div className={`relative mx-auto w-full ${className}`} role="region" aria-roledescription="carrusel" aria-label={ariaLabel}>
      <div className="min-w-0 overflow-hidden">
        <Swiper
          modules={[A11y, Autoplay, Keyboard]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            syncAutoplay(swiper, autoplay);
          }}
          loop={items.length > 1}
          slidesPerGroup={1}
          autoplay={autoplay ? { delay: autoplay.delay, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
          keyboard={{ enabled: true, onlyInViewport: true }}
          a11y={{ prevSlideMessage: controlLabels.previous, nextSlideMessage: controlLabels.next, firstSlideMessage: 'Primer elemento', lastSlideMessage: 'Último elemento' }}
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          breakpoints={breakpoints}
          watchOverflow
          className={`carousel-swiper ${responsiveFallback ? 'carousel-swiper-responsive' : ''} !overflow-hidden`}
        >
          {items.map((item, index) => <SwiperSlide key={index} className={`!h-auto ${slideClassName}`}>{renderItem(item, index)}</SwiperSlide>)}
        </Swiper>
      </div>
      {items.length > 1 && (
        <>
          <button type="button" className="absolute left-0 top-1/2 z-10 hidden h-20 w-10 -translate-y-1/2 items-center justify-center rounded-l-full bg-[#78235a] pl-1 text-white shadow-[4px_8px_20px_rgba(76,17,57,0.25)] transition hover:w-12 hover:bg-[#631849] focus:outline-none focus:ring-2 focus:ring-[#9a3676] focus:ring-offset-2 lg:-left-8 lg:flex lg:h-24 lg:w-12 xl:-left-12" aria-label={controlLabels.previous} onClick={() => swiperRef.current?.slidePrev()}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2.5] sm:h-6 sm:w-6"><path d="m14 5-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" className="absolute right-0 top-1/2 z-10 hidden h-20 w-10 -translate-y-1/2 items-center justify-center rounded-r-full bg-[#78235a] pr-1 text-white shadow-[-4px_8px_20px_rgba(76,17,57,0.25)] transition hover:w-12 hover:bg-[#631849] focus:outline-none focus:ring-2 focus:ring-[#9a3676] focus:ring-offset-2 lg:-right-8 lg:flex lg:h-24 lg:w-12 xl:-right-12" aria-label={controlLabels.next} onClick={() => swiperRef.current?.slideNext()}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2.5] sm:h-6 sm:w-6"><path d="m10 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </>
      )}
      <style>{`.carousel-swiper-responsive:not(.swiper-initialized) .swiper-slide { width: 100%; } @media (min-width: 640px) { .carousel-swiper-responsive:not(.swiper-initialized) .swiper-slide { width: calc((100% - 1rem) / 2); } } @media (min-width: 1024px) { .carousel-swiper-responsive:not(.swiper-initialized) .swiper-slide { width: calc((100% - 2rem) / 3); } }`}</style>
    </div>
  );
}
