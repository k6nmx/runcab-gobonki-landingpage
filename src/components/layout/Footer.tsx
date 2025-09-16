import Link from "next/link"
import Logo from "../ui/Logo"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 md:py-14 border-t border-neutral-800">
          <div className="md:grid md:grid-cols-12 md:gap-8">
            {/* Brand column */}
            <div className="md:col-span-4">
              <Logo src="/gobonki-white.svg" alt="Gobonki" className="h-7 w-auto" />
              <p className="mt-3 text-sm text-neutral-400 max-w-xs">
                Your digital stamp card solution
              </p>
            </div>

            {/* Nav columns */}
            <div className="mt-8 md:mt-0 md:col-span-8">
              {/* Mobile: accordion */}
              <div className="md:hidden">
                <Accordion type="single" collapsible className="w-full divide-y divide-neutral-800">
                  <AccordionItem value="product" className="border-0">
                    <AccordionTrigger className="text-sm font-semibold text-white">
                      Product
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 py-2">
                        <li><a href="#features" className="footer-link">Features</a></li>
                        <li><a href="#pricing" className="footer-link">Pricing</a></li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="company" className="border-0">
                    <AccordionTrigger className="text-sm font-semibold text-white">
                      Company
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 py-2">
                        <li><Link href="/about" className="footer-link">About</Link></li>
                        <li><Link href="/contact" className="footer-link">Contact</Link></li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="legal" className="border-0">
                    <AccordionTrigger className="text-sm font-semibold text-white">
                      Legal
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 py-2">
                        <li><Link href="/privacy" className="footer-link">Privacy Policy</Link></li>
                        <li><Link href="/imprint" className="footer-link">Imprint</Link></li>
                        <li><Link href="/terms" className="footer-link">Terms & Conditions</Link></li>
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
                    <li><a href="#features" className="footer-link">Features</a></li>
                    <li><a href="#testimonials" className="footer-link">Testimonials</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Company</h4>
                  <ul className="space-y-2">
                    <li><Link href="/faq" className="footer-link">FAQ</Link></li>
                    <li><Link href="/contact" className="footer-link">Contact</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Legal</h4>
                  <ul className="space-y-2">
                    <li><Link href="/privacy" className="footer-link">Privacy Policy</Link></li>
                    <li><Link href="/imprint" className="footer-link">Imprint</Link></li>
                    <li><Link href="/terms" className="footer-link">Terms of Service</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} gobonki. All rights reserved.</p>
            {/* <div className="flex gap-5">
              <Link href="/privacy" className="hover:text-neutral-300">Privacy</Link>
              <Link href="/imprint" className="hover:text-neutral-300">Imprint</Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
