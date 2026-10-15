import type { SlideSet } from '@/lib/images';
import Carousel from '@/components/organisms/Carousel';

type TestimonialImage = Readonly<{ src: string; alt: string; dark: boolean; set: SlideSet | null }>;
type Testimonial = Readonly<{
  name: string;
  images: ReadonlyArray<TestimonialImage>;
  diagnosis: string;
  history: string;
  email: string;
  whatsappLabel: string;
  whatsappUrl: string | null;
}>;
type TestimonialSliderProps = Readonly<{ testimonials: ReadonlyArray<Testimonial> }>;

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  return (
    <Carousel
      items={testimonials}
      ariaLabel="Testimonios de pacientes"
      autoplay={{ delay: 4000, maxWidth: 1024 }}
      className="max-w-6xl"
      controlLabels={{ previous: 'Testimonio anterior', next: 'Siguiente testimonio' }}
      breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      renderItem={(testimonial) => (
        <article className="flex h-full min-h-[56rem] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-28px_rgba(76,17,57,0.45)]">
          <div className={`shrink-0 bg-white p-2 ${testimonial.images.length > 1 ? 'grid h-56 grid-cols-2 grid-rows-[minmax(0,1fr)] gap-1' : 'block'}`}>
            {testimonial.images.map((image) => {
              const isSingle = testimonial.images.length === 1;
              const imageClass = !isSingle ? `min-h-0 min-w-0 h-full w-full object-contain cursor-zoom-in ${image.dark ? 'bg-black' : 'bg-white'}` : 'h-auto w-full rounded-t-xl object-cover cursor-zoom-in';
              return image.set ? (
                <picture key={image.src} className={isSingle ? 'block h-auto w-full' : 'block h-full min-h-0 min-w-0 w-full'}>
                  <source type="image/avif" srcSet={image.set.avifSrcSet} sizes={image.set.sizes} />
                  <source type="image/webp" srcSet={image.set.webpSrcSet} sizes={image.set.sizes} />
                  <img src={image.set.fallbackSrc} alt={image.alt} width={image.set.width} height={image.set.height} sizes={image.set.sizes} loading="lazy" decoding="async" className={imageClass} data-lightbox="" />
                </picture>
              ) : <img key={image.src} src={image.src} alt={image.alt} loading="lazy" decoding="async" className={imageClass} data-lightbox="" />;
            })}
          </div>
          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <h3 className="text-lg font-extrabold tracking-tight text-[#5c1642]">{testimonial.name}</h3>
            <div className="mt-3 border-y border-rose-100 py-3 text-xs leading-relaxed text-slate-700 sm:text-sm">
              <p className="font-bold text-[#5c1642]">Información de contacto</p>
              <p className="mt-1.5">Correo: <a className="font-semibold text-[#9a3676] underline underline-offset-2" href={`mailto:${testimonial.email}`}>{testimonial.email}</a></p>
              <p>WhatsApp: {testimonial.whatsappUrl ? <a className="font-semibold text-[#9a3676] underline underline-offset-2" href={testimonial.whatsappUrl} target="_blank" rel="noopener noreferrer">{testimonial.whatsappLabel}</a> : <span className="font-semibold">{testimonial.whatsappLabel}</span>}</p>
            </div>
            <p className="mt-4 text-base font-bold leading-snug text-[#78235a]">{testimonial.diagnosis}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{testimonial.history}</p>
          </div>
        </article>
      )}
    />
  );
}
