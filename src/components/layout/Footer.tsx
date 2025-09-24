import Link from "next/link";
import Logo from "../ui/Logo";
import { Linkedin, Instagram } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// TikTok icon - not in Lucide, so minimal SVG
const TikTokIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.321 5.562a5.122 5.122 0 01-.443-.258 6.228 6.228 0 01-1.138-.748c-1.133-1.008-1.511-2.534-1.511-2.534V2h-3.124v14.726c0 1.982-1.606 3.588-3.588 3.588s-3.588-1.606-3.588-3.588 1.606-3.588 3.588-3.588c.373 0 .733.057 1.074.163v-3.193c-.357-.052-.721-.081-1.091-.081C5.406 9.027 2 12.433 2 16.727s3.406 7.7 7.7 7.7 7.7-3.406 7.7-7.7V8.909c1.669 1.194 3.691 1.895 5.889 1.895v-3.133c-1.263 0-2.424-.377-3.398-1.024-.375-.249-.727-.535-1.04-.859z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 md:py-14 border-t border-neutral-800">
          <div className="md:grid md:grid-cols-12 md:gap-8">
            {/* Brand column */}
            <div className="md:col-span-4">
              <Logo
                src="/gobonki-white.svg"
                alt="Gobonki"
                className="h-7 w-auto"
              />
              <p className="mt-3 text-sm text-neutral-400 max-w-xs">
                Your digital stamp card solution
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4 mt-4">
                <a 
                  href="https://linkedin.com/company/gobonki" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://instagram.com/gobonki" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://tiktok.com/@gobonki" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                  aria-label="Follow us on TikTok"
                >
                  <TikTokIcon />
                </a>
              </div>
            </div>

            {/* Nav columns */}
            <div className="mt-8 md:mt-0 md:col-span-8">
              {/* Mobile: accordion */}
              <div className="md:hidden">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full divide-y divide-neutral-800"
                >
                  <AccordionItem value="product" className="border-0">
                    <AccordionTrigger className="text-sm font-semibold text-white">
                      Product
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 py-2">
                        <li>
                          <a href="#features" className="footer-link">
                            Features
                          </a>
                        </li>
                        <li>
                          <a href="#pricing" className="footer-link">
                            Pricing
                          </a>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="company" className="border-0">
                    <AccordionTrigger className="text-sm font-semibold text-white">
                      Company
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 py-2">
                        <li>
                          <Link href="/about" className="footer-link">
                            About
                          </Link>
                        </li>
                        <li>
                          <a
                            href={`mailto:hello@gobonki.com?subject=${encodeURIComponent(
                              "Hello Gobonki"
                            )}&body=${encodeURIComponent(
                              "I'd like to get in touch."
                            )}`}
                            className="footer-link"
                          >
                            Contact
                          </a>
                        </li>
                        <li>
                          <Link href="#contact" className="footer-link">
                            Newsletter
                          </Link>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="legal" className="border-0">
                    <AccordionTrigger className="text-sm font-semibold text-white">
                      Legal
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 py-2">
                        <li>
                          <Link href="/privacy" className="footer-link">
                            Privacy Policy
                          </Link>
                        </li>
                        <li>
                          <Link href="/imprint" className="footer-link">
                            Imprint
                          </Link>
                        </li>
                        <li>
                          <Link href="/terms" className="footer-link">
                            Terms & Conditions
                          </Link>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Desktop: 3-column grid */}
              <div className="hidden md:grid grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Product</h4>
                  <ul className="space-y-2">
                    <li>
                      <a href="#features" className="footer-link">
                        Features
                      </a>
                    </li>
                    <li>
                      <a href="#testimonials" className="footer-link">
                        Testimonials
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Company</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#faq" className="footer-link">
                        FAQ
                      </Link>
                    </li>
                    <li>
                      <a
                        href={`mailto:hello@gobonki.com?subject=${encodeURIComponent(
                          "Hello Gobonki"
                        )}&body=${encodeURIComponent(
                          "I'd like to get in touch."
                        )}`}
                        className="footer-link"
                      >
                        Contact
                      </a>
                    </li>
                    <li>
                      <Link href="#contact" className="footer-link">
                        Newsletter
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Legal</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/privacy" className="footer-link">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/imprint" className="footer-link">
                        Imprint
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="footer-link">
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-8 border-t border-neutral-800">
            <div className="flex flex-col items-center text-center gap-1 text-xs text-neutral-500">
              <p>© {new Date().getFullYear()} gobonki. All rights reserved.</p>
              <p>Made with 💙 in Europe</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}