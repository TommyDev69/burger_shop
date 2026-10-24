import React from 'react';
import { Children, isValidElement, useEffect, useState } from 'react';
import parse, { domToReact } from 'html-react-parser';
import { Link } from 'react-router-dom';

const pageRoutes = {
  'index.html': '/',
  'about.html': '/about',
  'feature.html': '/feature',
  'team.html': '/team',
  'menu.html': '/menu',
  'booking.html': '/booking',
  'blog.html': '/blog',
  'single.html': '/single',
  'contact.html': '/contact',
};

function classNames(node) {
  return node.attribs?.class?.split(/\s+/) ?? [];
}

function getText(node) {
  if (node.type === 'text') return node.data;
  return node.children?.map(getText).join('') ?? '';
}

function resolveLink(href, label) {
  const fileRoute = pageRoutes[href.split('/').pop()];
  if (fileRoute) return fileRoute;

  const normalizedLabel = label.trim().toLowerCase();
  if (normalizedLabel === 'about') return '/about';
  if (normalizedLabel === 'feature') return '/feature';
  if (normalizedLabel === 'chef') return '/team';
  if (normalizedLabel === 'menu') return '/menu';
  if (normalizedLabel === 'booking') return '/booking';
  if (normalizedLabel === 'contact') return '/contact';
  if (normalizedLabel.includes('blog')) return normalizedLabel.includes('detail') ? '/single' : '/blog';
  if (normalizedLabel === 'home') return '/';
  if (normalizedLabel.includes('view menu')) return '/menu';
  if (normalizedLabel.includes('book table')) return '/booking';
  if (normalizedLabel.includes('read more')) return '/single';
  return null;
}

function useReveal(content, loading) {
  useEffect(() => {
    if (loading || !content) return undefined;

    const targets = document.querySelectorAll('.react-page-content .container, .react-page-content .section-header');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('react-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [content, loading]);
}

function Carousel({ children, className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = Children.toArray(children).filter(isValidElement);

  useEffect(() => {
    if (slides.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % slides.length), 5500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (slides.length < 2) return <div className={className}>{children}</div>;

  return (
    <div aria-roledescription="carousel" className={`react-carousel ${className}`}>
      {slides.map((slide, index) => (
        <div
          aria-hidden={index !== activeIndex}
          className={`react-carousel-slide${index === activeIndex ? ' is-active' : ''}`}
          key={index}
        >
          {slide}
        </div>
      ))}
      <div className="react-carousel-controls" aria-label="Carousel controls">
        <button aria-label="Previous slide" onClick={() => setActiveIndex((activeIndex + slides.length - 1) % slides.length)} type="button"><i className="fa fa-angle-left" aria-hidden="true" /></button>
        <span aria-live="polite">{activeIndex + 1} / {slides.length}</span>
        <button aria-label="Next slide" onClick={() => setActiveIndex((activeIndex + 1) % slides.length)} type="button"><i className="fa fa-angle-right" aria-hidden="true" /></button>
      </div>
    </div>
  );
}

function MenuTabs({ node, options }) {
  const list = node.children.find((child) => child.name === 'ul');
  const content = node.children.find((child) => classNames(child).includes('tab-content'));
  const tabNodes = content?.children.filter((child) => child.type === 'tag' && classNames(child).includes('tab-pane')) ?? [];
  const labels = list?.children
    .filter((item) => item.type === 'tag')
    .map((item) => {
      const anchor = item.children.find((child) => child.name === 'a');
      return {
        id: anchor?.attribs?.href?.replace('#', ''),
        label: anchor?.children?.map((child) => child.data ?? '').join('').trim(),
      };
    }) ?? [];
  const [activeTab, setActiveTab] = useState(labels[0]?.id ?? 'burgers');

  return (
    <div className="menu-tab">
      <div aria-label="Food menu categories" className="nav nav-pills justify-content-center" role="tablist">
        {labels.map(({ id, label }) => (
          <button
            aria-selected={activeTab === id}
            className={`nav-link${activeTab === id ? ' active' : ''}`}
            id={`${id}-tab`}
            key={id}
            onClick={() => setActiveTab(id)}
            role="tab"
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      {tabNodes.map((tab) => {
        const id = tab.attribs?.id;
        return (
          <div
            aria-labelledby={`${id}-tab`}
            className={`${classNames(tab).filter((name) => !['tab-pane', 'fade', 'active'].includes(name)).join(' ')} tab-pane${activeTab === id ? ' active' : ''}`}
            hidden={activeTab !== id}
            id={id}
            key={id}
            role="tabpanel"
          >
            {domToReact(tab.children, options)}
          </div>
        );
      })}
    </div>
  );
}

function ParsedContent({ markup, onVideoOpen }) {
  const options = {
    replace(node) {
      if (node.type !== 'tag') return undefined;
      const classes = classNames(node);

      if (['script', 'noscript'].includes(node.name)) return <></>;
      if (classes.includes('navbar') || classes.includes('footer') || classes.includes('back-to-top') || classes.includes('modal')) return <></>;

      if (node.name === 'a' && node.attribs?.href !== undefined) {
        const route = resolveLink(node.attribs.href, getText(node));
        if (route) {
          const { href, class: className, ...attributes } = node.attribs;
          return <Link {...attributes} className={className} to={route}>{domToReact(node.children, options)}</Link>;
        }
      }

      if (node.name === 'option' && node.attribs?.selected !== undefined) {
        const { selected, ...attributes } = node.attribs;
        return <option {...attributes}>{domToReact(node.children, options)}</option>;
      }

      if (node.name === 'input' || node.name === 'textarea') {
        if (node.attribs?.['aria-label']) return undefined;
        const { class: className, ...attributes } = node.attribs ?? {};
        const controlProps = {
          ...attributes,
          className,
          'aria-label': node.attribs?.placeholder || node.attribs?.name || 'Form field',
        };
        if (node.name === 'textarea') {
          controlProps.defaultValue = getText(node);
          return React.createElement('textarea', controlProps);
        }
        return React.createElement('input', controlProps);
      }

      if (classes.includes('owl-carousel')) {
        const children = domToReact(node.children, options);
        if (classes.includes('testimonials-carousel')) return <div className="react-testimonial-grid">{children}</div>;
        if (classes.includes('related-slider')) return <div className="react-related-grid">{children}</div>;
        return <Carousel>{children}</Carousel>;
      }

      if (classes.includes('menu-tab')) return <MenuTabs node={node} options={options} />;

      if (classes.includes('btn-play')) {
        const { 'data-src': videoSrc, class: className, ...attributes } = node.attribs;
        return <button {...attributes} className={className} onClick={() => onVideoOpen(videoSrc)} type="button">{domToReact(node.children, options)}</button>;
      }

      return undefined;
    },
  };

  return parse(markup, options);
}

export default function PageContent({ markup: sourceMarkup, pageName }) {
  const [markup, setMarkup] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [video, setVideo] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    setNotice('');

    try {
      if (!sourceMarkup) throw new Error(`Missing page source: ${pageName}`);
      const documentNode = new DOMParser().parseFromString(sourceMarkup, 'text/html');
      documentNode.querySelectorAll('script, .navbar, .footer, .back-to-top, .modal').forEach((element) => element.remove());
      setMarkup(documentNode.body.innerHTML);
      setLoading(false);
    } catch {
      setError(`The ${pageName} page could not be loaded.`);
      setLoading(false);
    }
  }, [sourceMarkup, pageName]);

  useReveal(markup, loading);

  function handleSubmit(event) {
    if (event.target.tagName !== 'FORM') return;
    event.preventDefault();
    const form = event.target;
    const hasContactEndpoint = form.id === 'contactForm';
    setNotice(hasContactEndpoint
      ? 'The original contact form requires its PHP mail service. This React preview has not sent your message.'
      : 'This form is a frontend template only. No reservation or message was sent.');
  }

  return (
    <div className="react-page-content" onClick={(event) => {
      const link = event.target.closest('a[href=""], a[href="#"]');
      if (link) event.preventDefault();
    }} onSubmit={handleSubmit}>
      {loading && <div aria-live="polite" className="react-page-status">Loading page…</div>}
      {error && <div className="react-page-status alert alert-danger" role="alert">{error}</div>}
      {notice && <div className="react-page-status alert alert-info" role="status">{notice}</div>}
      {!loading && markup && <ParsedContent markup={markup} onVideoOpen={setVideo} />}
      {video && (
        <div className="react-video-backdrop" onClick={() => setVideo('')} role="presentation">
          <div aria-labelledby="react-video-title" aria-modal="true" className="react-video-dialog" onClick={(event) => event.stopPropagation()} role="dialog">
            <h2 className="sr-only" id="react-video-title">About Burger King video</h2>
            <button aria-label="Close video" className="react-video-close" onClick={() => setVideo('')} type="button">&times;</button>
            <iframe allow="autoplay; encrypted-media" allowFullScreen src={`${video}?autoplay=1&modestbranding=1&showinfo=0`} title="Burger King introduction video" />
          </div>
        </div>
      )}
    </div>
  );
}