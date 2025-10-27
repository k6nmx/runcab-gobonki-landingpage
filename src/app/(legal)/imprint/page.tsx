"use client";

import { useState } from 'react';
import ContactModal from '@/components/ContactModal';
//import type {Metadata} from 'next';

// export const metadata: Metadata = {
//   title: 'Imprint | gobonki',
//   description: 'Provider identification and contact information.'
// };

export default function ImprintPage() {
   const [contactModalOpen, setContactModalOpen] = useState(false);
  return (
    <>
        <main className=" bg-gray-50 py-20 px-4">
      <div className="mx-auto max-w-3xl bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-semibold text-slate-800 border-b pb-4 mb-6">Imprint</h1>
        <p className="mt-2 mb-6 text-sm text-neutral-500">Last updated: 2025-01-01</p>

        <div className="mb-4">runcab GmbH</div>
        <div className="mb-4">Flottwellstraße 28</div>
        <div className="mb-4">10785 Berlin</div>
        <div className="mb-4">Germany</div>
        
        <h2 className="text-xl font-semibold text-slate-700 mb-2">Kontaktinformationen:</h2>
        <p className="mb-4">
          E-mail:{' '}
          <button 
            onClick={() => setContactModalOpen(true)}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            info@gobonki.com
          </button>
        </p>
        
        <h2 className="text-xl font-semibold text-slate-700 mb-2">Bevollmächtigte Vertreter:</h2>
        <p className="mb-4">Christian Renner</p>
        <p className="mb-4">Max Kolhagen</p>
        
        <p className="mb-4">Eingetragener Sitz: Germany</p>
        <p className="mb-4">Registergericht: Amtsgericht Charlottenburg</p>
        <p className="mb-4">Handelsregisternummer: HRB 278388 B</p>
      </div>
    </main>
    <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </>
    
  );
}
