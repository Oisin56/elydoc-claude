import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

// React requires eval() in development mode for debugging features (e.g.
// reconstructing callstacks). It is never used in production builds, so we only
// relax script-src for dev.
const scriptSrc = [
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  isDev ? "'unsafe-eval'" : '',
]
  .filter(Boolean)
  .join(' ')

// ─── Security headers ─────────────────────────────────────────────────────────
// Applied to all routes including /studio. If Sanity Studio breaks in production
// due to CSP, scope these headers to '/((?!studio).*)' to exclude that path.
const securityHeaders = [
  // Prefetch DNS for improved performance
  { key: 'X-DNS-Prefetch-Control', value: 'on' },

  // Prevent the site being embedded in an iframe on other origins
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },

  // Prevent MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },

  // Control referrer information sent with requests
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

  // Restrict access to browser features not used by this site
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },

  // Enforce HTTPS for 2 years, including subdomains — preload list eligible
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },

  // Content Security Policy
  // script-src: allows GTM and inline scripts (JSON-LD)
  // style-src: allows Tailwind inline styles and Next.js internal styles
  // img-src: allows Sanity CDN, picsum placeholders and data URIs
  // connect-src: allows Sanity API and GTM data layer
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      // *.sanity.io covers the API/CDN hosts used by the client-side fetch
      // (e.g. <projectId>.apicdn.sanity.io) as well as Studio.
      "connect-src 'self' https://*.sanity.io wss://*.sanity.io",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
