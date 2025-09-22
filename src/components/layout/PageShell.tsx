// 'use client'
// import { useMode } from '../../context/mode-context'
// import Header from '@/components/layout/Header'
// import Hero from '@/components/sections/Hero/hero'
// import Features from '@/components/sections/Features'
// import Testimonials from '@/components/sections/Testimonials'
// import Newsletter from '@/components/sections/Newsletter'
// import FAQ from '@/components/sections/FAQ'
// import Footer from '@/components/layout/Footer'
// import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

// export default function PageShell() {
//   const { mode } = useMode()
//   const prefersReducedMotion = useReducedMotion()

//   return (
//     <>
//       <Header />
//       {/* Animate the WHOLE main area when mode changes */}
//       <AnimatePresence mode="wait" initial={false}>
//         <motion.main
//           key={mode}
//           initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
//           transition={{ duration: 0.25, ease: [0.2, 0.6, 0.2, 1] }}
//         >
//           <Hero />
//           <Features />
//           <Testimonials />
//           <Newsletter />
//           <FAQ />
//         </motion.main>
//       </AnimatePresence>
//       <Footer />
//     </>
//   )
// }
