'use client';

import React, { useEffect, useState } from 'react';

type ConsentState = 'unknown' | 'necessary' | 'all' | 'custom';

export default function PrivacyPage() {
  const [consent, setConsent] = useState<ConsentState>('unknown');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    
    try {
      const saved = localStorage.getItem('gobonki_cookie_consent') as ConsentState | null;
      if (saved) setConsent(saved);
    } catch (e) {
      // ignore localStorage errors
      setConsent('unknown');
    }
  }, []);

  useEffect(() => {
    // persist preference
    try {
      if (consent !== 'unknown') localStorage.setItem('gobonki_cookie_consent', consent);
    } catch (e) {}
  }, [consent]);

  const acceptAll = () => setConsent('all');
  const acceptNecessary = () => setConsent('necessary');
  const openSettings = () => setShowSettings(true);
  const closeSettings = () => setShowSettings(false);

  const [analyticsEnabled, setAnalyticsEnabled] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem('gobonki_analytics_enabled');
      return raw === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gobonki_analytics_enabled', analyticsEnabled ? 'true' : 'false');
      
    } catch {}
  }, [analyticsEnabled]);

  return (
    <main className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="mx-auto max-w-3xl bg-white p-8 rounded-2xl shadow-md">
        <div className="mb-6 p-4 border-l-4 border-yellow-500 bg-yellow-50 text-yellow-800 rounded-md">
          <h3 className="font-semibold text-lg">Disclaimer</h3>
          <p className="mt-1">This document is only available in German.</p>
        </div>

        <h1 className="text-3xl font-semibold text-slate-800 border-b pb-4 mb-6">Datenschutzerklärung</h1>

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

      {/* Cookie banner */}
      {consent === 'unknown' && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4">
          <div className="bg-gray-100 border-l-4 border-blue-500 p-4 rounded-xl shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Einwilligungstext für Cookiebanner</h3>
                <p className="text-slate-600 mt-1">
                  Die Runcab GmbH nutzt Cookies und ähnliche Technologien, um den Betrieb von Gobonki sicherzustellen und Ihr Nutzererlebnis zu verbessern.
                </p>
              </div>

              <div className="flex-shrink-0 flex items-center gap-2">
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 rounded-md bg-emerald-500 text-white font-medium shadow hover:opacity-95"
                >
                  Alle akzeptieren
                </button>

                <button
                  onClick={acceptNecessary}
                  className="px-4 py-2 rounded-md bg-gray-300 text-slate-800 font-medium hover:opacity-95"
                >
                  Nur notwendige
                </button>

                <button
                  onClick={openSettings}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:opacity-95"
                >
                  Einstellungen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings modal (simple) */}
      {showSettings && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeSettings}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-xl w-full bg-white p-6 rounded-2xl shadow-lg">
            <h4 className="text-xl font-semibold text-slate-800">Cookie-Einstellungen</h4>
            <p className="text-slate-600 mt-2">Wählen Sie, welche optionalen Funktionen Sie zulassen möchten.</p>

            <div className="mt-4 space-y-4">
              <label className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-700">Analytics (PostHog)</div>
                  <div className="text-slate-500 text-sm">Ermöglicht anonyme Nutzungsanalyse zur Produktverbesserung.</div>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="h-5 w-5 rounded"
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-700">Marketing</div>
                  <div className="text-slate-500 text-sm">Personalisierte Werbung (falls aktiviert).</div>
                </div>
                <input type="checkbox" disabled className="h-5 w-5 rounded opacity-50" />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={closeSettings} className="px-4 py-2 rounded-md bg-gray-200">
                Abbrechen
              </button>
              <button
                onClick={() => {
                  setConsent('custom');
                  setShowSettings(false);
                }}
                className="px-4 py-2 rounded-md bg-blue-600 text-white"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Small sticky status for developer/debugging (optional) */}
      <div className="fixed top-6 right-6 text-xs bg-white/80 backdrop-blur rounded-md p-2 border">
        <div className="text-slate-700">Consent: <span className="font-medium">{consent}</span></div>
      </div>
    </main>
  );
}
