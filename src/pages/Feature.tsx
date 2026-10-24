import React from 'react';
import PageContent from '../components/PageContent.jsx';
import source from '../../template-pages/feature.html?raw';

export default function Feature() {
  return <PageContent markup={source} pageName="Feature" />;
}