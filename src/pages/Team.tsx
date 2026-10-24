import React from 'react';
import PageContent from '../components/PageContent.jsx';
import source from '../../template-pages/team.html?raw';

export default function Team() {
  return <PageContent markup={source} pageName="Team" />;
}