import React from 'react'
import FirstCard from './FirstCard';
import SecCard from './SecCard';

function CardBody() {
  return (
    <section aria-labelledby="offers-title" className="bg-black/[.04] py-12">
      <div className="mx-auto grid w-full max-w-[1366px] grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-[30px]">
        <h2 className="sr-only" id="offers-title">Today's offers</h2>
        <FirstCard />
        <SecCard />
      </div>
    </section>
  );
}

export default CardBody;
