import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | gobonki',
  description: 'The rules that govern use of gobonki.'
};

export default function TermsPage() {
  return (
    <article className="prose prose-neutral max-w-none">
      <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">Terms & Conditions</h1>
      <p className="mt-2 text-sm text-neutral-500">Last updated: 2025-01-01</p>

      <h2>1. Acceptance</h2>
      <p>By accessing gobonki, you agree to these Terms. If you do not agree, do not use the service.</p>

      <h2>2. Accounts & eligibility</h2>
      <p>You must provide accurate information and are responsible for any activity under your account or device.</p>

      <h2>3. Use of service</h2>
      <ul className="list-disc pl-6">
        <li>No fraudulent stamping or reward abuse.</li>
        <li>No reverse engineering, scraping, or interfering with security features.</li>
      </ul>

      <h2>4. Fees</h2>
      <p>Core features may be free; paid tiers and pricing will be communicated clearly before purchase.</p>

      <h2>5. Intellectual property</h2>
      <p>All rights in the platform and brand remain with gobonki. You retain rights to your own content.</p>

      <h2>6. Termination</h2>
      <p>We may suspend or terminate access for breach. You may stop using the service at any time.</p>

      <h2>7. Disclaimers & liability</h2>
      <p>Service is provided “as is”. To the extent permitted by law, our liability is limited.</p>

      <h2>8. Governing law</h2>
      <p>These Terms are governed by your business jurisdiction. Venue and law clauses can be tailored later.</p>

      <h2>9. Contact</h2>
      <p>support@gobonki.com</p>
    </article>
  );
}
