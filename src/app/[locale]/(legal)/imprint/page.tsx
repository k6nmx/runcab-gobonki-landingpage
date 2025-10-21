import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Imprint | gobonki',
  description: 'Provider identification and contact information.'
};

export default function ImprintPage() {
  return (
    <article className="prose prose-neutral max-w-none">
      <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">Imprint</h1>
      <p className="mt-2 mb-10 text-sm text-neutral-500">Last updated: 2025-01-01</p>

      <div>runcab GmbH</div>
      <div>Flottwellstraße 28</div>
      <div>10785 Berlin</div>
      <div>Germany</div>
      <br />
      <div><strong>Kontaktinformationen:</strong></div>
      <div>
        E-mail: <a href="mailto:info@gobonki.com">info@gobonki.com</a>
      </div>
      <br />
      <div><strong>Bevollmächtigte Vertreter:</strong></div>
      <div>Christian Renner</div>
      <div>Max Kolhagen</div>
      <br />
      <div>Eingetragener Sitz: Germany</div>
      <div>Registergericht: Amtsgericht Charlottenburg</div>
      <div>Handelsregisternummer: HRB 278388 B</div>

    </article>
  );
}
