import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/AuthContext';
import { Red_Hat_Display } from 'next/font/google'


const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });


const redHat = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-redhat',
})

export const metadata: Metadata = {
  title: 'anycompany - Incorporate your business with ease',
  description: 'Incorporate your business effortlessly with anycompany. Fast, reliable, and fully compliant company formation services tailored to your needs.',
  generator: 'Next.js',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  
  return (
    <html lang="en">
        <body className={`${redHat.variable}`}>
          <AuthProvider>
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
            <Toaster />
            {children}
          </GoogleOAuthProvider>
          </AuthProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
