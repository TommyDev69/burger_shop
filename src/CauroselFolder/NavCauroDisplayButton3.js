import React from 'react';

function NavCauroDisplayButton3() {
    return (
        <div className="max-w-3xl pb-12 md:pb-20">
            <h1 className="mb-6 font-display text-4xl font-bold text-white md:text-6xl">Fastest Order <span className="text-[#fbaf32]">Delivery</span></h1>
            <p className="mx-auto mb-8 max-w-2xl font-serif text-base leading-relaxed text-white md:text-lg">
                Morbi sagittis turpis id suscipit feugiat. Suspendisse eu augue urna.
                Morbi sagittis, orci sodales varius fermentum, tortor
            </p>

            <div className="flex flex-wrap justify-center gap-3">
                <a className="border-2 border-[#fbaf32] bg-[#fbaf32] px-7 py-4 font-display font-bold text-white transition-colors hover:bg-transparent hover:text-[#fbaf32]" href="#menu">View Menu</a>
                <a className="border-2 border-[#719a0a] bg-[#719a0a] px-7 py-4 font-display font-bold text-white transition-colors hover:bg-transparent hover:text-[#719a0a]" href="#booking">Book Table</a>
            </div>

        </div>

    );

}
export default NavCauroDisplayButton3;