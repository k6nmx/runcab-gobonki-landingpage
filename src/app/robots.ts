// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://runcab-gobonki-landingpage.vercel.app'

  return {
    
    rules: {
      userAgent: '*',
      allow: '/',               
      disallow: ['/api', '/_next']
    },
    sitemap: `${baseUrl}/sitemap.xml`
   
  }
}
