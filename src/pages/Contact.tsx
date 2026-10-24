import React from 'react';
import PageContent from '../components/PageContent.jsx';
import source from '../../template-pages/contact.html?raw';

export default function Contact() {
  return <PageContent markup={source} pageName="Contact" />;
}