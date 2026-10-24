import React from 'react';
import PageContent from '../components/PageContent.jsx';
import source from '../../template-pages/blog.html?raw';

export default function Blog() {
  return <PageContent markup={source} pageName="Blog" />;
}