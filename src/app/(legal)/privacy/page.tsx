import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | gobonki',
  description: 'How gobonki collects, uses, and protects your data.'
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-neutral max-w-none">
      <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-neutral-500">Last updated: 2025-01-01</p>

      <p className="mt-6">
        This policy explains how gobonki (“we”, “us”) collects and processes personal data when you
        use our website and digital stamp cards.
      </p>

      <h2>Data we collect</h2>
      <ul className="list-disc pl-6">
        <li>Contact details (e.g., email or phone) for account linking and stamp recovery.</li>
        <li>Usage events (stamps issued/redeemed) to operate rewards.</li>
        <li>Device & log data (IP, user agent) for security and fraud prevention.</li>
      </ul>

      <h2>How we use data</h2>
      <ul className="list-disc pl-6">
        <li>Operate the loyalty program and sync your stamps across devices.</li>
        <li>Prevent abuse and ensure fair use of rewards.</li>
        <li>Send service messages and (with consent) product updates.</li>
      </ul>

      <h2>Legal bases</h2>
      <p>We process data based on contract performance, legitimate interests, and your consent where required.</p>

      <h2>Retention</h2>
      <p>We keep data only as long as necessary for the purposes above or to comply with legal obligations.</p>

      <h2>Sharing</h2>
      <p>We use vetted processors (e.g., hosting, analytics, email). We never sell personal data.</p>

      <h2>Your rights</h2>
      <p>You may request access, correction, deletion, or portability, and object to certain processing.</p>

      <h2>Contact</h2>
      <p>
        gobonki • support@gobonki.com<br/>
        If you are in the EU/UK, you may also contact your local supervisory authority.
      </p>
    </article>
  );
}
