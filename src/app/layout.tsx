import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { personalData } from '@/data/personal';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://alekha1234.github.io/gujurialekha.github.io/'),
  title: 'Alekha Gujuri | Data Scientist & Machine Learning Engineer',
  description:
    'Portfolio of Alekha Gujuri — Associate Data Scientist with 2+ years of experience across predictive modeling, computer vision, and machine learning pipelines.',
  keywords: [
    'Alekha Gujuri',
    'Gujuri Alekha',
    'Data Scientist',
    'Machine Learning Engineer',
    'AI Specialist',
    'Computer Vision',
    'YOLOv5',
    'TensorFlow',
    'Scikit-Learn',
    'Bengaluru Data Scientist',
    'Trinity Mobility',
    'Rubixe',
  ],
  authors: [{ name: 'Alekha Gujuri', url: 'https://github.com/alekha1234' }],
  creator: 'Alekha Gujuri',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alekha1234.github.io/gujurialekha.github.io/',
    title: 'Alekha Gujuri | Data Scientist & Machine Learning Engineer',
    description:
      'Transforming complex observational data into deterministic predictive systems. Explore production case studies, research code, and ML benchmarks.',
    siteName: 'Alekha Gujuri — Data Scientist Portfolio',
    images: [
      {
        url: 'https://raw.githubusercontent.com/alekha1234/gujurialekha.github.io/main/documents/logos/profile-img.png',
        width: 800,
        height: 800,
        alt: 'Alekha Gujuri — Data Scientist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alekha Gujuri | Data Scientist',
    description:
      'Explore machine learning case studies, deep learning vision models, and applied data science systems.',
    creator: '@Alekha81293434',
    images: ['https://raw.githubusercontent.com/alekha1234/gujurialekha.github.io/main/documents/logos/profile-img.png'],
  },
  icons: {
    icon: 'https://raw.githubusercontent.com/alekha1234/gujurialekha.github.io/main/documents/logos/profile-img.png',
    apple: 'https://raw.githubusercontent.com/alekha1234/gujurialekha.github.io/main/documents/logos/profile-img.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Analytics & Tag Manager */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${personalData.analytics.googleAnalyticsId}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${personalData.analytics.googleAnalyticsId}');
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-lab-bg text-lab-text-primary antialiased selection:bg-lab-accent selection:text-lab-bg`}
      >
        {children}
      </body>
    </html>
  );
}
