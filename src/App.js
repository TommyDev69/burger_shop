import React from 'react';
import { useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Feature from './pages/Feature.tsx';
import Team from './pages/Team.tsx';
import Menu from './pages/Menu.tsx';
import Booking from './pages/Booking.tsx';
import Blog from './pages/Blog.tsx';
import BlogDetails from './pages/BlogDetails.tsx';
import Contact from './pages/Contact.tsx';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return null;
}

function SiteLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="react-page-shell">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about" />
          <Route element={<Feature />} path="/feature" />
          <Route element={<Team />} path="/team" />
          <Route element={<Menu />} path="/menu" />
          <Route element={<Booking />} path="/booking" />
          <Route element={<Blog />} path="/blog" />
          <Route element={<BlogDetails />} path="/single" />
          <Route element={<Contact />} path="/contact" />
          <Route element={<Home />} path="*" />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SiteLayout />
    </HashRouter>
  );
}
