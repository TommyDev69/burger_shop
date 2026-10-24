import React from 'react';
import PageContent from '../components/PageContent.jsx';
import source from '../../template-pages/index.html?raw';

export default function Home() {
  return <PageContent markup={source} pageName="Home" />;
}