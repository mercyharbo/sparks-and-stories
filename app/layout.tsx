import FooterComp from '@/components/footer'
import NavbarComp from '@/components/navbar'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Sparks and Stories | Creative Writing Community',
  description:
    'Join our vibrant community of writers sharing stories, poetry, and creative works. Get inspired, connect with fellow authors, and share your literary journey.',
  keywords: [
    'creative writing',
    'stories',
    'poetry',
    'writing community',
    'authors',
  ],
  openGraph: {
    title: 'Sparks and Stories',
    description: 'A community for creative writers and storytellers',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sparks and Stories',
    images: [
      {
        url: 'https://ik.imagekit.io/m17ea4jzw/homepage.png?updatedAt=1744929724823', // Add your image path here
        width: 1200,
        height: 630,
        alt: 'Sparks and Stories - Creative Writing Community',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sparks and Stories',
    description: 'A community for creative writers and storytellers',
    images: [
      'https://ik.imagekit.io/m17ea4jzw/homepage.png?updatedAt=1744929724823',
    ], // Same image as OG
    creator: '@codewithmercy', // Optional: add your Twitter username
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavbarComp />
        <main className='mt-[5rem]'>{children}</main>
        <FooterComp />
      </body>
    </html>
  )
}
