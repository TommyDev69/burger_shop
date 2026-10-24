import React from 'react'
import { useState } from 'react';
import BurgarLogo from '../Images/BurgerLogo.png'

function NavHead(props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [pagesOpen, setPagesOpen] = useState(false);
    const links = [
        [props.Home, '#Home'], [props.About, '#offers-title'], [props.Feature, '#offers-title'],
        [props.Chef, '#offers-title'], [props.Menu, '#offers-title'], [props.Booking, '#offers-title'],
        [props.Contact, '#offers-title'],
    ];

    return (
        <header className="relative z-50 bg-white px-4 py-3 lg:absolute lg:top-0 lg:w-full lg:bg-transparent lg:px-[60px] lg:py-[25px]">
            <div className="mx-auto flex w-full max-w-[1366px] flex-wrap items-center justify-between">
                <a aria-label="Eatery home" className="inline-flex items-center" href="#Home" onClick={() => setMenuOpen(false)}>
                    <img alt="Eatery" className="h-[52px] w-auto object-contain lg:h-[70px]" src={BurgarLogo} />
                </a>
                <button aria-controls="legacy-navigation" aria-expanded={menuOpen} aria-label="Toggle navigation" className="rounded border border-[#fbaf32] bg-[#fbaf32] p-2 text-[#454545] lg:hidden" onClick={() => setMenuOpen(!menuOpen)} type="button">
                    <span aria-hidden="true" className="flex h-5 w-6 flex-col justify-around"><span className="h-0.5 bg-current"/><span className="h-0.5 bg-current"/><span className="h-0.5 bg-current"/></span>
                </button>
                <nav className={`${menuOpen ? 'block' : 'hidden'} w-full pt-3 lg:block lg:w-auto lg:pt-0`} id="legacy-navigation">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:gap-1">
                        {links.slice(0, 6).map(([label, href], index) => <a className={`px-3 py-2 font-display text-base font-semibold transition-colors hover:text-[#fbaf32] lg:text-lg ${index === 0 ? 'text-[#fbaf32]' : 'text-[#454545] lg:text-white'}`} href={href} key={`${label}-${index}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
                        <div className="relative">
                            <button aria-expanded={pagesOpen} className="w-full px-3 py-2 text-left font-display text-base font-semibold text-[#454545] hover:text-[#fbaf32] lg:text-lg lg:text-white" onClick={() => setPagesOpen(!pagesOpen)} type="button">Pages</button>
                            {pagesOpen && <div className="left-0 top-full z-50 min-w-40 bg-white py-2 shadow-lg lg:absolute"><a className="block px-4 py-2 text-[#454545] hover:bg-gray-100 hover:text-[#fbaf32]" href="#blog" onClick={() => setMenuOpen(false)}>Blog Grid</a><a className="block px-4 py-2 text-[#454545] hover:bg-gray-100 hover:text-[#fbaf32]" href="#blog" onClick={() => setMenuOpen(false)}>Blog Detail</a></div>}
                        </div>
                        <a className="px-3 py-2 font-display text-base font-semibold text-[#454545] transition-colors hover:text-[#fbaf32] lg:text-lg lg:text-white" href="#offers-title" onClick={() => setMenuOpen(false)}>{props.Contact}</a>
                        <form className="mt-2 flex gap-2 px-3 lg:ml-2 lg:mt-0 lg:px-0" onSubmit={(event) => event.preventDefault()} role="search">
                            <input aria-label="Search menu" className="min-w-0 rounded border border-white/70 bg-white/90 px-3 py-2 text-[#454545] placeholder:text-gray-500 lg:w-36" placeholder="Search menu" type="search" />
                            <button className="rounded border border-[#fbaf32] px-3 py-2 text-[#fbaf32] transition-colors hover:bg-[#fbaf32] hover:text-white" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        </header>
    )
}
export default NavHead;
