import React from 'react'
import { useEffect, useState } from 'react';
import FirstImage1 from '../Images/carousel-1.jpg'
import SecImage2 from '../Images/carousel-2.jpg'
import ThirdImage3 from '../Images/carousel-3.jpg'

import NavCauroDisplayButton from './NavCauroDisplayButton';
import NavCauroDisplayButton2 from './NavCauroDisplayButton2';
import NavCauroDisplayButton3 from './NavCauroDisplayButton3';


function Caurosel() {
    const slides = [
        { image: FirstImage1, alt: 'Freshly prepared burger with fries', content: <NavCauroDisplayButton /> },
        { image: SecImage2, alt: 'Freshly prepared restaurant dish', content: <NavCauroDisplayButton2 /> },
        { image: ThirdImage3, alt: 'A selection of fresh food ready for delivery', content: <NavCauroDisplayButton3 /> },
    ];
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
        const timer = window.setInterval(() => setActive((index) => (index + 1) % slides.length), 4500);
        return () => window.clearInterval(timer);
    }, [slides.length]);

    return (
        <section aria-label="Featured dishes" aria-roledescription="carousel" className="relative h-[min(100vh,760px)] min-h-[520px] overflow-hidden bg-[#454545]">
            {slides.map((slide, index) => (
                <article aria-hidden={active !== index} className={`absolute inset-0 transition-opacity duration-700 ${active === index ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'}`} key={slide.image}>
                    <img alt={slide.alt} className="absolute inset-0 h-full w-full object-cover" src={slide.image} />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute inset-0 z-10 mx-auto flex max-w-4xl items-center justify-center px-5 pb-20 text-center text-white">
                        {slide.content}
                    </div>
                </article>
            ))}
            <div className="absolute bottom-6 right-5 z-20 flex items-center gap-3 text-sm font-bold text-white md:right-10">
                <button aria-label="Previous slide" className="grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-black/25 hover:bg-[#fbaf32]" onClick={() => setActive((active + slides.length - 1) % slides.length)} type="button">‹</button>
                <span aria-live="polite">{active + 1} / {slides.length}</span>
                <button aria-label="Next slide" className="grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-black/25 hover:bg-[#fbaf32]" onClick={() => setActive((active + 1) % slides.length)} type="button">›</button>
            </div>
        </section>
    )
}

export default Caurosel



