import React from 'react';
import PageContent from '../components/PageContent.jsx';
import source from '../../template-pages/menu.html?raw';

export default function Menu() {
  return <PageContent markup={source} pageName="Menu" />;
}