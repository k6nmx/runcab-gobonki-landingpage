import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Imprint | gobonki',
  description: 'Provider identification and contact information.'
};

export default function ImprintPage() {
  return (
    <article className="prose prose-neutral max-w-none">
      <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">Imprint</h1>
      <p className="mt-2 text-sm text-neutral-500">Last updated: 2025-01-01</p>

      <h2>Provider</h2>
      <p>
        gobonki GmbH (placeholder)<br/>
        Sample Street 1, 1010 City, Country
      </p>

      <h2>Represented by</h2>
      <p>Max Mustermann, Managing Director</p>

      <h2>Contact</h2>
      <p>
        E-mail: support@gobonki.com<br/>
        Phone: +49 30 123456
      </p>

      <h2>VAT ID</h2>
      <p>DE123456789</p>

      <h2>Dispute resolution</h2>
      <p>We are not obligated to participate in dispute resolution proceedings before a consumer arbitration board.</p>
    </article>
  );
}
