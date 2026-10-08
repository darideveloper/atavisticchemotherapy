import { useEffect, useRef } from 'react';
import { A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import type { SlideSet } from '@/lib/images';
import 'swiper/css';

type TestimonialImage = Readonly<{
  src: string;
  alt: string;
  set: SlideSet | null;
}>;

type Testimonial = Readonly<{
  name: string;
  images: ReadonlyArray<TestimonialImage>;
  diagnosis: string;
  history: string;
  treatment: string;
  email: string;
  whatsappLabel: string;
  whatsappUrl: string | null;
}>;

type TestimonialSliderProps = Readonly<{
  testimonials: ReadonlyArray<Testimonial>;
}>;

function syncAutoplay(swiper: SwiperInstance) {
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isDesktop || prefersReducedMotion) {
    swiper.autoplay.stop();
    return;
  }

  swiper.autoplay.start();
}

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);

  useEffect(() => {
    const updateAutoplay = () => {
      if (swiperRef.current) {
        syncAutoplay(swiperRef.current);
      }
    };

    updateAutoplay();
    window.addEventListener('resize', updateAutoplay);
    return () => window.removeEventListener('resize', updateAutoplay);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-6xl" role="region" aria-roledescription="carrusel" aria-label="Testimonios de pacientes">
      <div className="min-w-0 overflow-hidden">
      <Swiper
        modules={[A11y, Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          syncAutoplay(swiper);
        }}
        loop
        slidesPerGroup={1}
        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        a11y={{
          prevSlideMessage: 'Testimonio anterior',
          nextSlideMessage: 'Siguiente testimonio',
          firstSlideMessage: 'Primer testimonio',
          lastSlideMessage: 'Último testimonio',
        }}
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        watchOverflow
        className="testimonial-swiper !overflow-hidden"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.name} className="!h-auto">
            <article className="flex h-full min-h-[56rem] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-28px_rgba(76,17,57,0.45)]">
              <div className={`grid h-56 shrink-0 grid-rows-[minmax(0,1fr)] gap-1 bg-rose-50 p-2 ${testimonial.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {testimonial.images.map((image, index) => {
                  const imageClass = testimonial.images.length > 1
                    ? `min-h-0 min-w-0 h-full w-full object-contain ${index === 1 ? 'bg-black' : 'bg-rose-50'}`
                    : 'h-full w-full object-fill';

                  return image.set ? (
                    <picture key={image.src} className="block h-full min-h-0 min-w-0 w-full">
                      <source type="image/avif" srcSet={image.set.avifSrcSet} sizes={image.set.sizes} />
                      <source type="image/webp" srcSet={image.set.webpSrcSet} sizes={image.set.sizes} />
                      <img
                        src={image.set.fallbackSrc}
                        alt={image.alt}
                        width={image.set.width}
                        height={image.set.height}
                        sizes={image.set.sizes}
                        loading="lazy"
                        decoding="async"
                        className={imageClass}
                      />
                    </picture>
                  ) : (
                    <img
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                      className={imageClass}
                    />
                  );
                })}
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-lg font-extrabold tracking-tight text-[#5c1642]">{testimonial.name}</h3>
                <div className="mt-3 border-y border-rose-100 py-3 text-xs leading-relaxed text-slate-700 sm:text-sm">
                  <p className="font-bold text-[#5c1642]">Información de contacto</p>
                  <p className="mt-1.5">
                    Correo:{' '}
                    <a className="font-semibold text-[#9a3676] underline underline-offset-2" href={`mailto:${testimonial.email}`}>
                      {testimonial.email}
                    </a>
                  </p>
                  <p>
                    WhatsApp:{' '}
                    {testimonial.whatsappUrl ? (
                      <a className="font-semibold text-[#9a3676] underline underline-offset-2" href={testimonial.whatsappUrl} target="_blank" rel="noopener noreferrer">
                        {testimonial.whatsappLabel}
                      </a>
                    ) : (
                      <span className="font-semibold">{testimonial.whatsappLabel}</span>
                    )}
                  </p>
                </div>
                <p className="mt-4 text-base font-bold leading-snug text-[#78235a]">{testimonial.diagnosis}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{testimonial.history}</p>
                <p className="mt-4 text-sm font-bold leading-relaxed text-[#4658aa]">{testimonial.treatment}</p>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>

      <button
        type="button"
        className="testimonial-slider-prev absolute left-0 top-1/2 z-10 hidden h-20 w-10 -translate-y-1/2 items-center justify-center rounded-l-full bg-[#78235a] pl-1 text-white shadow-[4px_8px_20px_rgba(76,17,57,0.25)] transition hover:w-12 hover:bg-[#631849] focus:outline-none focus:ring-2 focus:ring-[#9a3676] focus:ring-offset-2 lg:-left-8 lg:flex lg:h-24 lg:w-12 xl:-left-12"
        aria-label="Testimonio anterior"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2.5] sm:h-6 sm:w-6">
          <path d="m14 5-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        className="testimonial-slider-next absolute right-0 top-1/2 z-10 hidden h-20 w-10 -translate-y-1/2 items-center justify-center rounded-r-full bg-[#78235a] pr-1 text-white shadow-[-4px_8px_20px_rgba(76,17,57,0.25)] transition hover:w-12 hover:bg-[#631849] focus:outline-none focus:ring-2 focus:ring-[#9a3676] focus:ring-offset-2 lg:-right-8 lg:flex lg:h-24 lg:w-12 xl:-right-12"
        aria-label="Siguiente testimonio"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2.5] sm:h-6 sm:w-6">
          <path d="m10 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <style>{`
        .testimonial-swiper:not(.swiper-initialized) .swiper-slide { width: 100%; }
        @media (min-width: 640px) {
          .testimonial-swiper:not(.swiper-initialized) .swiper-slide { width: calc((100% - 1rem) / 2); }
        }
        @media (min-width: 1024px) {
          .testimonial-swiper:not(.swiper-initialized) .swiper-slide { width: calc((100% - 2rem) / 3); }
        }
      `}</style>
    </div>
  );
}
