import React from 'react';
import PageContent from '../components/PageContent.jsx';
import source from '../../template-pages/booking.html?raw';

export default function Booking() {
  return <PageContent markup={source} pageName="Booking" />;
}