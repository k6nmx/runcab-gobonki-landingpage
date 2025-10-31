//import { analyticsManager } from "@/utils/analytics-manager";
import * as CookieConsent from "vanilla-cookieconsent";
import { type CookieConsentConfig } from "vanilla-cookieconsent";

const pluginConfig: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: "bar",
      position: "bottom",
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: "box",
      position: "right",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    necessary: {
      readOnly: true,
    },
    analytics: {},
  },
  language: {
    default: "en",
    autoDetect: "document",
    translations: {
      en: {
        consentModal: {
          title: "🍪 It's cookie time!",
          description:
            "runcab GmbH uses cookies and similar technologies to ensure the operation of gobonki and to improve your user experience. This includes technically necessary cookies as well as – with your consent – analytics and marketing cookies. You can adjust your selection and withdraw your consent at any time.",
          closeIconLabel: "",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          showPreferencesBtn: "Manage preferences",
          footer:
            '<a href="http://app.gobonki.com/pages/customer/privacy">Privacy Policy</a>\n<a href="http://app.gobonki.com/pages/customer/terms">Terms and conditions</a>',
        },
        preferencesModal: {
          title: "Consent Preferences Center",
          closeIconLabel: "Close modal",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Save preferences",
          serviceCounterLabel: "Service|Services",
          sections: [
            {
              title: "Cookie Usage",
              description:
                "We use cookies and similar technologies to provide and improve our services. Cookies are small text files that are stored on your device when you visit our website. We use different types of cookies for different purposes, and some are essential for our website to function while others help us understand how you use our services and improve your experience.",
            },
            {
              title:
                'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
              description:
                "These cookies are essential for our website to function properly and cannot be disabled. They include authentication cookies for user login and session management (Supabase session tokens), anonymous user identification cookies, and framework cookies required for the basic operation of our application. Without these cookies, our services cannot be provided to you. These cookies are set based on our legitimate interest in providing our services (§ 25 Abs. 2 TTDSG).\n",
              linkedCategory: "necessary",
            },
            {
              title: "Analytics Cookies",
              description:
                "We use analytics cookies to understand how you interact with our website and to improve our services. These include PostHog for product analytics and user behavior tracking, and Sentry for error monitoring and performance analysis. Both services are configured to use EU-hosted infrastructure and proxy connections through our domain to enhance privacy. These cookies help us identify technical issues, understand user preferences, and optimize our application performance. The use of analytics cookies requires your explicit consent (§ 25 Abs. 1 TTDSG).",
              linkedCategory: "analytics",
            },
            {
              title: "More information",
              description:
                'For any query in relation to our policy on cookies and our choices, please <a class="cc__link" href="https://www.gobonki.com/#contact">contact us</a>.',
            },
          ],
        },
      },
      de: {
        consentModal: {
          title: "🍪 Es ist Cookie-Zeit!",
          description:
            "Die runcab GmbH nutzt Cookies und ähnliche Technologien, um den Betrieb von gobonki sicherzustellen und dein Nutzererlebnis zu verbessern. Dazu gehören technisch notwendige Cookies sowie – mit deiner Zustimmung – Analyse- und Marketing-Cookies. Du kannst deine Auswahl anpassen und deine Einwilligung jederzeit widerrufen.",
          closeIconLabel: "",
          acceptAllBtn: "Alle akzeptieren",
          acceptNecessaryBtn: "Alle ablehnen",
          showPreferencesBtn: "Einstellungen verwalten",
          footer:
            '<a href="http://app.gobonki.com/pages/customer/privacy">Datenschutzerklärung</a>\n<a href="http://app.gobonki.com/pages/customer/terms">Allgemeine Geschäftsbedingungen</a>',
        },
        preferencesModal: {
          title: "Präferenzen für die Zustimmung",
          closeIconLabel: "Schließen",
          acceptAllBtn: "Alle akzeptieren",
          acceptNecessaryBtn: "Alle ablehnen",
          savePreferencesBtn: "Einstellungen speichern",
          serviceCounterLabel: "Dienstleistungen",
          sections: [
            {
              title: "Verwendung von Cookies",
              description:
                "Wir verwenden Cookies und ähnliche Technologien, um unsere Dienste bereitzustellen und zu verbessern. Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie unsere Website besuchen. Wir verwenden verschiedene Arten von Cookies für verschiedene Zwecke, und einige sind für das Funktionieren unserer Website unerlässlich, während andere uns helfen zu verstehen, wie Sie unsere Dienste nutzen und Ihre Erfahrung zu verbessern.",
            },
            {
              title:
                'Unbedingt erforderliche Cookies <span class="pm__badge">Immer aktiviert</span>',
              description:
                "Diese Cookies sind für das ordnungsgemäße Funktionieren unserer Website unerlässlich und können nicht deaktiviert werden. Sie umfassen Authentifizierungs-Cookies für Benutzeranmeldung und Sitzungsverwaltung (Supabase-Sitzungstoken), anonyme Benutzeridentifikations-Cookies und Framework-Cookies, die für den grundlegenden Betrieb unserer Anwendung erforderlich sind. Ohne diese Cookies können wir Ihnen unsere Dienste nicht anbieten. Diese Cookies werden auf der Grundlage unseres berechtigten Interesses an der Bereitstellung unserer Dienste gesetzt (§ 25 Abs. 2 TTDSG).\n",
              linkedCategory: "necessary",
            },
            {
              title: "Analyse-Cookies",
              description:
                "Wir verwenden Analyse-Cookies, um zu verstehen, wie Sie mit unserer Website interagieren und unsere Dienste zu verbessern. Dazu gehören PostHog für Produktanalysen und Benutzerverhaltens-Tracking sowie Sentry für Fehlerüberwachung und Leistungsanalyse. Beide Dienste sind so konfiguriert, dass sie EU-gehostete Infrastruktur und Proxy-Verbindungen über unsere Domain verwenden, um die Privatsphäre zu verbessern. Diese Cookies helfen uns, technische Probleme zu identifizieren, Benutzerpräferenzen zu verstehen und die Leistung unserer Anwendung zu optimieren. Die Verwendung von Analyse-Cookies erfordert Ihre ausdrückliche Einwilligung (§ 25 Abs. 1 TTDSG).",
              linkedCategory: "analytics",
            },
            {
              title: "Weitere Informationen",
              description:
                'Bei Fragen zu unserer Cookie-Richtlinie und unseren Entscheidungen wenden Sie sich bitte <a class="cc__link" href="https://www.gobonki.com/#contact">an uns</a>.',
            },
          ],
        },
      },
    },
  },
  onConsent: function () {
    // Initialize analytics services when consent is given
    if (CookieConsent.acceptedCategory("analytics")) {
      //analyticsManager.onConsentGiven();
    }
  },
  onChange: function ({ changedCategories }) {
    // Handle consent changes
    if (changedCategories.includes("analytics")) {
      if (CookieConsent.acceptedCategory("analytics")) {
        //analyticsManager.onConsentGiven();
      } else {
        //analyticsManager.onConsentRevoked();
      }
    }
  },
};

export default pluginConfig;
