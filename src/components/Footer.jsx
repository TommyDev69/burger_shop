import React from 'react';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setShowTop(window.scrollY > 200);
    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="row">
                <div className="col-md-6">
                  <div className="footer-contact">
                    <h2>Our Address</h2>
                    <p><i className="fa fa-map-marker-alt" aria-hidden="true" />20, 0lorunsogo street, Erigo, Ijebu Ode, Ogun State, Nigeria</p>
                    <p><i className="fa fa-phone-alt" aria-hidden="true" />+234 9026274950</p>
                    <p><i className="fa fa-envelope" aria-hidden="true" />sunnevian4life@gmail.com</p>
                    <div className="footer-social" aria-label="Social media">
                      <a href="#" aria-label="Twitter"><i className="fab fa-twitter" aria-hidden="true" /></a>
                      <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f" aria-hidden="true" /></a>
                      <a href="#" aria-label="YouTube"><i className="fab fa-youtube" aria-hidden="true" /></a>
                      <a href="#" aria-label="Instagram"><i className="fab fa-instagram" aria-hidden="true" /></a>
                      <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in" aria-hidden="true" /></a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="footer-link">
                    <h2>Quick Links</h2>
                    {['Terms of use', 'Privacy policy', 'Cookies', 'Help', 'FAQs'].map((label) => <a href="#" key={label}>{label}</a>)}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="footer-newsletter">
                <h2>Newsletter</h2>
                <p>Lorem ipsum dolor sit amet elit. Quisque eu lectus a leo dictum nec non quam. Tortor eu placerat rhoncus, lorem quam iaculis felis, sed lacus neque id eros.</p>
                <form className="form" onSubmit={(event) => event.preventDefault()}>
                  <label className="sr-only" htmlFor="newsletter-email">Email address</label>
                  <input className="form-control" id="newsletter-email" type="email" placeholder="Email goes here" />
                  <button className="btn custom-btn" type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
         <div class="copyright">
            <div class="container">
                <p>Copyright &copy; <a href="https://stack-profile.vercel.app/">SUNNEVIAN</a>, All Right Reserved.</p>
                <p>Designed By <a href="https://stack-profile.vercel.app/">Tommydev69</a></p>
            </div>
          </div>
      </footer>
      <button
        aria-label="Back to top"
        className="back-to-top react-back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ display: showTop ? 'block' : 'none' }}
        type="button"
      >
        <i className="fa fa-chevron-up" aria-hidden="true" />
      </button>
    </>
  );
}