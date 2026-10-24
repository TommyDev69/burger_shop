import React from 'react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ceoLogo from '../Images/ceo-logo.png';
const primaryLinks = [
  ['Home', '/'],
  ['About', '/about'],
  ['Feature', '/feature'],
  ['Chef', '/team'],
  ['Menu', '/menu'],
  ['Booking', '/booking'],
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const updateSticky = () => setIsSticky(window.scrollY > 0);
    window.addEventListener('scroll', updateSticky, { passive: true });
    updateSticky();
    return () => window.removeEventListener('scroll', updateSticky);
  }, []);

  return (
    <header className={`navbar navbar-light react-navbar z-50 flex flex-wrap items-center justify-between bg-white px-4 py-3 transition-shadow duration-300 lg:left-0 lg:w-full ${isSticky ? 'nav-sticky fixed top-0 bg-white shadow-md lg:py-[10px]' : 'relative lg:absolute lg:top-0 lg:bg-transparent lg:px-[60px] lg:py-[30px]'}`}>
      <div className="mx-auto flex w-full max-w-[1366px] flex-wrap items-center justify-between">
        <Link className="navbar-brand m-0 font-display text-3xl font-bold text-[#fbaf32] no-underline transition-colors hover:text-[#fbaf32] md:text-[45px]" to="/" onClick={() => setMenuOpen(false)}>
          <img src={ceoLogo} alt="Burger King" className="h-[52px] w-auto object-contain lg:h-[70px]" />
        </Link>
        <button
          className="rounded border border-[#fbaf32] p-2 text-[#454545] transition-colors hover:bg-[#fbaf32] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fbaf32] lg:hidden"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" className="flex h-5 w-6 flex-col justify-around">
            <span className="h-0.5 w-full bg-current" />
            <span className="h-0.5 w-full bg-current" />
            <span className="h-0.5 w-full bg-current" />
          </span>
        </button>
        <nav className={`w-full basis-full transition-[max-height,opacity] duration-300 lg:flex lg:w-auto lg:basis-auto lg:justify-between${menuOpen ? ' block' : ' hidden lg:flex'}`}>
          <div className="flex flex-col pt-3 lg:ml-auto lg:flex-row lg:items-center lg:pt-0">
            {primaryLinks.map(([label, to]) => (
              <NavLink
                className={({ isActive }) => `nav-link block border-0 bg-transparent px-3 py-2 font-display text-base font-semibold no-underline transition-colors hover:text-[#fbaf32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fbaf32] lg:text-lg ${isActive ? 'active text-[#fbaf32]' : 'text-[#454545] lg:text-white'}`}
                end={to === '/'}
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <div className={`relative ${pagesOpen ? 'show' : ''}`}>
              <button
                className="nav-link flex w-full items-center justify-between border-0 bg-transparent px-3 py-2 text-left font-display text-base font-semibold text-[#454545] transition-colors hover:text-[#fbaf32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fbaf32] lg:text-lg lg:text-white"
                type="button"
                aria-expanded={pagesOpen}
                onClick={() => setPagesOpen((open) => !open)}
              >
                Pages
              </button>
              <div className={`absolute left-0 top-full z-50 min-w-40 bg-[#f8f9fa] py-2 shadow-lg ${pagesOpen ? 'block' : 'hidden'} lg:left-auto`}>
                <Link className="block px-4 py-2 text-[#454545] no-underline transition-colors hover:bg-gray-100 hover:text-[#fbaf32]" to="/blog" onClick={() => { setPagesOpen(false); setMenuOpen(false); }}>Blog Grid</Link>
                <Link className="block px-4 py-2 text-[#454545] no-underline transition-colors hover:bg-gray-100 hover:text-[#fbaf32]" to="/single" onClick={() => { setPagesOpen(false); setMenuOpen(false); }}>Blog Detail</Link>
              </div>
            </div>
            <NavLink
              className={({ isActive }) => `nav-link block px-3 py-2 font-display text-base font-semibold no-underline transition-colors hover:text-[#fbaf32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fbaf32] lg:text-lg ${isActive ? 'active text-[#fbaf32]' : 'text-[#454545] lg:text-white'}`}
              to="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </NavLink>
          </div>
        </nav>
        <form action="#" className={`${menuOpen ? 'flex' : 'hidden'} w-full basis-full gap-2 px-3 py-3 lg:ml-5 lg:flex lg:w-auto lg:basis-auto lg:px-0 lg:py-0`} method="get" role="search">
          <label className="sr-only" htmlFor="navbar-search">Search the menu</label>
          <input
            className="min-w-0 flex-1 rounded-md border border-white/70 bg-white px-3 py-2 text-[#454545] placeholder:text-gray-500 focus:border-[#fbaf32] focus:outline-none focus:ring-2 focus:ring-[#fbaf32]/30 lg:w-36 lg:flex-none"
            id="navbar-search"
            name="search"
            placeholder="Search..."
            required
            type="search"
          />
          <button className="shrink-0 rounded-md border border-[#fbaf32] bg-[#fbaf32] px-4 py-2 font-display font-semibold text-white transition-colors hover:bg-transparent hover:text-[#fbaf32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fbaf32]" type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}