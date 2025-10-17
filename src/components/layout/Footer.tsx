'use client';

import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { Linkedin, Instagram } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { useMessages, useLocale, useTranslations } from 'next-intl';
import React from 'react';

// --- Types for the footer messages coming from locales
type SocialLinks = {
  linkedin?: string;
  instagram?: string;
  tiktok?: string;
};

type MailtoItem = {
  type: 'mailto';
  label: string;
  email: string;
  subject?: string;
  body?: string;
};

type AnchorItem = {
  type: 'anchor';
  label: string;
  href: string;
};

type LinkItem = {
  type: 'link';
  label: string;
  href: string;
};

type ColumnItem = MailtoItem | AnchorItem | LinkItem;

type Column = {
  title: string;
  items?: ColumnItem[];
};

type FooterMessages = {
  brand?: {
    logoAlt?: string;
    tagline?: string;
    social?: SocialLinks;
  };
  columns?: Column[];
  bottom?: {
    copyright?: string;
    madeIn?: string;
  };
};

// Minimal TikTok SVG inside component to keep dependencies small
function TikTokIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M19.321 5.562a5.122 5.122 0 01-.443-.258 6.228 6.228 0 01-1.138-.748c-1.133-1.008-1.511-2.534-1.511-2.534V2h-3.124v14.726c0 1.982-1.606 3.588-3.588 3.588s-3.588-1.606-3.588-3.588 1.606-3.588 3.588-3.588c.373 0 .733.057 1.074.163v-3.193c-.357-.052-.721-.081-1.091-.081C5.406 9.027 2 12.433 2 16.727s3.406 7.7 7.7 7.7 7.7-3.406 7.7-7.7V8.909c1.669 1.194 3.691 1.895 5.889 1.895v-3.133c-1.263 0-2.424-.377-3.398-1.024-.375-.249-.727-.535-1.04-.859z"/>
    </svg>
  );
}

export default function Footer() {
  // useMessages returns "any-ish" at runtime; cast to unknown then narrow
  const rawMessages = useMessages() as unknown;
  const t = useTranslations();
  const currentLocale = useLocale();
  const toHome = (hash: string) => `/${currentLocale}${hash}`;

  // Defensive extraction: ensure the structure matches our expected shape, else fallback
  const footerMessages: FooterMessages =
    typeof rawMessages === 'object' && rawMessages !== null && 'footer' in (rawMessages as Record<string, unknown>)
      ? ((rawMessages as Record<string, unknown>)['footer'] as FooterMessages)
      : {
          brand: { logoAlt: 'Gobonki', tagline: 'Your digital stamp card solution', social: {} },
          columns: [],
          bottom: { copyright: '', madeIn: '' },
        };

  const brand = footerMessages.brand ?? { logoAlt: 'Gobonki', tagline: 'Your digital stamp card solution', social: {} };
  const columns: Column[] = Array.isArray(footerMessages.columns) ? (footerMessages.columns as Column[]) : [];

  // helper to build a mailto link from item data
  const buildMailto = (email: string, subject?: string, body?: string) => {
    const params = new URLSearchParams();
    if (subject) params.set('subject', subject);
    if (body) params.set('body', body);
    const paramStr = params.toString();
    return `mailto:${email}${paramStr ? `?${paramStr}` : ''}`;
  };

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 md:py-14 border-t border-neutral-800">
          <div className="md:grid md:grid-cols-12 md:gap-8">
            {/* Brand column */}
            <div className="md:col-span-4">
              <Link href={toHome("#")} aria-label="Home" onClick={handleScrollToTop}>
              <Logo src="/gobonki-white.svg" alt={brand.logoAlt ?? 'Gobonki'} className="h-7 w-auto" />
              </Link>
              <p className="mt-3 text-sm text-neutral-400 max-w-xs">
                {brand.tagline ?? 'Your digital stamp card solution'}
              </p>

              {/* Social Links */}
              <div className="flex space-x-4 mt-4">
                {brand.social?.linkedin && (
                  <a
                    href={brand.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                    aria-label="Follow us on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {brand.social?.instagram && (
                  <a
                    href={brand.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {brand.social?.tiktok && (
                  <a
                    href={brand.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                    aria-label="Follow us on TikTok"
                  >
                    <TikTokIcon />
                  </a>
                )}
              </div>
            </div>

            {/* Nav columns */}
            <div className="mt-8 md:mt-0 md:col-span-8">
              {/* Mobile: accordion */}
              <div className="md:hidden">
                <Accordion type="single" collapsible className="w-full divide-y divide-neutral-800">
                  {columns.map((col, idx) => (
                    <AccordionItem key={idx} value={`${idx}`} className="border-0">
                      <AccordionTrigger className="text-sm font-semibold text-white">
                        {col.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-3 py-2">
                          {(col.items ?? []).map((it, j) => {
                            // Narrow discriminated union by `type`
                            if (it.type === 'anchor') {
                              const anchor = it as AnchorItem;
                              return (
                                <li key={j}>
                                  <a href={anchor.href} className="footer-link">
                                    {anchor.label}
                                  </a>
                                </li>
                              );
                            }
                            if (it.type === 'link') {
                              const link = it as LinkItem;
                              return (
                                <li key={j}>
                                  <Link href={link.href} className="footer-link">
                                    {link.label}
                                  </Link>
                                </li>
                              );
                            }
                            if (it.type === 'mailto') {
                              const mail = it as MailtoItem;
                              return (
                                <li key={j}>
                                  <a href={buildMailto(mail.email, mail.subject, mail.body)} className="footer-link">
                                    {mail.label}
                                  </a>
                                </li>
                              );
                            }
                            return null;
                          })}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Desktop: 3-column grid */}
              <div className="hidden md:grid grid-cols-3 gap-8">
                {columns.map((col, i) => (
                  <div key={i}>
                    <h4 className="font-semibold mb-4">{col.title}</h4>
                    <ul className="space-y-2">
                      {(col.items ?? []).map((it, k) => {
                        if (it.type === 'anchor') {
                          const anchor = it as AnchorItem;
                          return (
                            <li key={k}>
                              <a href={anchor.href} className="footer-link">
                                {anchor.label}
                              </a>
                            </li>
                          );
                        }
                        if (it.type === 'link') {
                          const link = it as LinkItem;
                          return (
                            <li key={k}>
                              <Link href={link.href} className="footer-link">
                                {link.label}
                              </Link>
                            </li>
                          );
                        }
                        if (it.type === 'mailto') {
                          const mail = it as MailtoItem;
                          return (
                            <li key={k}>
                              <a href={buildMailto(mail.email, mail.subject, mail.body)} className="footer-link">
                                {mail.label}
                              </a>
                            </li>
                          );
                        }
                        return null;
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-8 border-t border-neutral-800">
            <div className="flex flex-col items-center text-center gap-1 text-xs text-neutral-500">
              <p>
                {t('footer.bottom.copyright', { year: new Date().getFullYear() })}
              </p>
              <p>{t('footer.bottom.madeIn')}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
