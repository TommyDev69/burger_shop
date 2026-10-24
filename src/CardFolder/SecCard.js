import React from 'react';
import { useState } from 'react';
import SweetPizza2 from '../Images/pizza.png';

function SecCard() {
  const [notice, setNotice] = useState('');

  return (
    <article className="overflow-hidden rounded-2xl border-2 border-[#fbaf32] bg-white shadow-[inset_12px_3px_45px_3px_#fbaf32]">
      <div className="grid h-full grid-cols-1 md:grid-cols-[5fr_7fr]">
        <img className="h-64 w-full object-cover md:h-full" src={SweetPizza2} alt="Pizza topped with vegetables and cheese" />
        <div className="flex flex-col items-start justify-center p-6 md:p-8">
          <h2 className="mb-2 font-display text-2xl font-bold text-[#454545]">Tasty Pizza</h2>
          <p className="mb-3 font-serif text-4xl italic text-[#fbaf32]">20% <span className="text-2xl">Off</span></p>
          <p className="mb-6 text-base font-semibold text-[#454545]">A crisp, oven-baked pizza with fresh toppings and a 20% offer.</p>
          <button className="rounded border-2 border-[#fbaf32] bg-[#fbaf32] px-6 py-3 font-display font-bold text-white transition-colors hover:bg-transparent hover:text-[#fbaf32]" onClick={() => setNotice('Ordering is not connected to a checkout service.')} type="button">
            Order now
          </button>
          {notice && <p className="mt-3 text-sm text-[#454545]" role="status">{notice}</p>}
        </div>
      </div>
    </article>
  );
}

export default SecCard;
