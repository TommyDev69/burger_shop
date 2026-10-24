import React from 'react';
import PageContent from '../components/PageContent.jsx';
import source from '../../template-pages/about.html?raw';

export default function About() {
  return <PageContent markup={source} pageName="About" />;
}