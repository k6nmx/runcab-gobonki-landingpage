'use client';

import React, { useEffect, useState } from 'react';

export default function PrivacyPage() {

  return (
    <article className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="mx-auto max-w-3xl bg-white p-8 rounded-2xl shadow-md">

        <h1 className="text-3xl font-semibold text-slate-800 border-b pb-4 mb-6">Datenschutzerklärung</h1>

        <div className="mb-6 p-4 border-l-4 border-yellow-500 bg-yellow-50 text-yellow-800 rounded-md">
          <h3 className="font-semibold text-lg">Disclaimer</h3>
          <p className="mt-1">This document is only available in German.</p>
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">1. Allgemeine Hinweise</h2>
          <p className="text-slate-600 leading-relaxed">
            Wir freuen uns über Ihr Interesse an Gobonki. Datenschutz hat einen besonders hohen Stellenwert für uns.
            Eine Nutzung der Internetseiten ist grundsätzlich ohne jede Angabe personenbezogener Daten möglich. Sofern eine betroffene Person
            besondere Services unseres Unternehmens über unsere Internetseite in Anspruch nehmen möchte, könnte jedoch eine Verarbeitung personenbezogener Daten erforderlich werden.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">2. Zwecke und Datenkategorien</h2>

          <h3 className="text-lg font-medium text-slate-700 mt-3">2.1 Shop Owner</h3>
          <p className="text-slate-600 leading-relaxed">
            Zur Registrierung und Verwaltung von Kunden, welche Stempelkarten anbieten („Show Owner“) verarbeiten wir die angegeben Stammdaten (Name, E-Mail, Adresse, Unternehmensdaten),
            Vertragsdaten (Programmdetails, Laufzeiten) sowie Kommunikationsdaten (insb. Supportanfragen). Zweck ist die Begründung, Durchführung und Beendigung des Vertrags mit Shop Ownern sowie die Sicherstellung der Funktionsfähigkeit von Gobonki.
          </p>

          <p className="text-slate-600 leading-relaxed mt-3">
            Die Zwecke sind die Bereitstellung eines übergreifenden Nutzerkontos, die Teilnahme an Programmen verschiedener Shop Owner, die Abwicklung von Stempeln und Prämien, die Missbrauchsprävention, die technische Sicherheit und die Optimierung von Gobonki.
            Für die Pflichtangaben zur Accountführung ist Rechtsgrundlage für die Verarbeitung ihrer Daten Art. 6 Abs. 1 lit. b) DSGVO.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">3. Freiwillige (einwilligungsbasierte) Zusatzfunktionen</h2>
          <p className="text-slate-600 leading-relaxed">
            Zur Bereitstellung von Gobonki setzen wir verschiedene Dienstleister ein, die in der Regel als weisungsgebundene Auftragsverarbeiter gemäß Art. 28 Abs. 1 DSGVO für uns tätig sind.
            Auftragsverarbeiter sind im Rahmen eines Auftragsverarbeitungsvertrages (DPA) vertraglich gebunden, die erhobenen Daten nur für unsere Zwecke und nach unserer Weisung zu verarbeiten.
          </p>

          <h3 className="text-lg font-medium text-slate-700 mt-3">Hosting und Bereitstellung</h3>
          <p className="text-slate-600 leading-relaxed">
            Für das Hosting und die Auslieferung der Anwendung ist es erforderlich, dass Server- und Verbindungsdaten verarbeitet werden. Dazu gehört insbesondere Ihre IP-Adresse, aufgerufene URLs, Zeitpunkte von Anfragen, Fehler-Logs und technische Metadaten.
          </p>

          <h3 className="text-lg font-medium text-slate-700 mt-3">Authentifizierung und Datenbankverwaltung</h3>
          <p className="text-slate-600 leading-relaxed">
            Um Ihnen die Registrierung und Anmeldung sowie die Verwaltung von Stempelkartenprogrammen zu ermöglichen, werden Anmeldedaten (E-Mail-Adresse, Passwort in verschlüsselter Form), Sitzungsinformationen und Programmdaten verarbeitet.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">4. Analyse des Nutzerverhaltens - PostHog</h2>
          <p className="text-slate-600 leading-relaxed">
            Eine direkte Weitergabe der durch PostHog erhobenen Daten an Dritte erfolgt nicht. Auswertungen können in aggregierter oder anonymisierter Form erfolgen.
            Die Datenverarbeitung erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Ohne Ihre Zustimmung wird PostHog nicht aktiviert.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">5. Standort- und Kartenfunktionen - Google Maps (Karten/Standorte)</h2>
          <p className="text-slate-600 leading-relaxed">
            Wenn Sie die Standortfunktionen in Gobonki nutzen, wird Ihr aktueller Standort (sofern Sie dem zugestimmt haben) an Google Maps übermittelt. Wir speichern Ihre Standortdaten nicht dauerhaft.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">6. Cookies und ähnliche Technologien</h2>
          <p className="text-slate-600 leading-relaxed">
            Wir verwenden Cookies und vergleichbare Technologien (z. B. Session Tokens, Local Storage, Pixel), um die Nutzung unserer Anwendung zu ermöglichen und zu verbessern.
          </p>

          <ul className="list-disc pl-5 mt-3 text-slate-600 space-y-3">
            <li>
              <h4 className="font-medium text-slate-700">Technisch notwendige Cookies</h4>
              <p className="leading-relaxed">
                Erforderlich für Authentifizierung, Sitzungen und die Grundfunktionalität. Verwendung auf Basis von § 25 Abs. 2 TTDSG.
              </p>
            </li>
            <li>
              <h4 className="font-medium text-slate-700">Funktionale Cookies (optional)</h4>
              <p className="leading-relaxed">Speichern Einstellungen und verbessern Performance. Nur mit Einwilligung.</p>
            </li>
            <li>
              <h4 className="font-medium text-slate-700">Marketing-Cookies (optional)</h4>
              <p className="leading-relaxed">Verfolgen Interessen und liefern personalisierte Inhalte – nur mit Einwilligung.</p>
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">7. Ihre Rechte</h2>
          <p className="text-slate-600 leading-relaxed">
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Wenden Sie sich hierzu an die unten angegebene Kontaktadresse.
          </p>

          <address className="not-italic mt-4 text-slate-600">
            Berliner Beauftragte für Datenschutz und Informationsfreiheit<br />
            Friedrichstr. 219<br />
            10969 Berlin<br />
            Fax: 030/2155050<br />
            E-Mail: <a className="text-blue-600 hover:underline" href="mailto:mailbox@datenschutz-berlin.de">mailbox@datenschutz-berlin.de</a><br />
            Web: <a className="text-blue-600 hover:underline" href="https://www.datenschutz-berlin.de" target="_blank" rel="noreferrer">datenschutz-berlin.de</a>
          </address>
        </section>
      </div>
    </article>
  );
}
