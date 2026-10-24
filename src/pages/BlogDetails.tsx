import React from 'react';
import PageContent from '../components/PageContent.jsx';
import source from '../../template-pages/single.html?raw';

export default function BlogDetails() {
  return <PageContent markup={source} pageName="Blog Details" />;
}