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
  title: {
    default: 'Alekha Gujuri | Data Scientist & Machine Learning Engineer',
    template: '%s | Alekha Gujuri',
  },
  description:
    'Portfolio of Alekha Gujuri — Associate Data Scientist with 2.5 years of experience across predictive modeling, time-series forecasting, smart city IoT, and MLOps pipelines.',
  keywords: [
    'Alekha Gujuri',
    'Gujuri Alekha',
    'Associate Data Scientist',
    'Machine Learning Engineer',
    'AI Specialist',
    'Time-Series Forecasting',
    'Smart City IoT',
    'MLOps & Nexus',
    'Computer Vision',
    'YOLOv5',
    'FastAPI Microservices',
    'Bengaluru Data Scientist',
    'Trinity Mobility',
  ],
  authors: [{ name: 'Alekha Gujuri', url: 'https://github.com/alekha1234' }],
  creator: 'Alekha Gujuri',
  alternates: {
    canonical: 'https://alekha1234.github.io/gujurialekha.github.io/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        url: 'https://alekha1234.github.io/gujurialekha.github.io/documents/logos/profile-img.png',
        width: 800,
        height: 800,
        alt: 'Alekha Gujuri — Associate Data Scientist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alekha Gujuri | Data Scientist & Machine Learning Engineer',
    description:
      'Explore machine learning case studies, deep learning vision models, time-series pipelines, and applied data science systems.',
    creator: '@Alekha81293434',
    images: ['https://alekha1234.github.io/gujurialekha.github.io/documents/logos/profile-img.png'],
  },
  icons: {
    icon: '/documents/logos/profile-img.png',
    apple: '/documents/logos/profile-img.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://alekha1234.github.io/gujurialekha.github.io/#website',
      url: 'https://alekha1234.github.io/gujurialekha.github.io/',
      name: 'Alekha Gujuri — Data Scientist Portfolio',
      description:
        'Portfolio of Alekha Gujuri — Associate Data Scientist specializing in time-series forecasting, multi-stage ML pipelines, smart city IoT systems, and MLOps.',
      publisher: {
        '@id': 'https://alekha1234.github.io/gujurialekha.github.io/#person',
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://alekha1234.github.io/gujurialekha.github.io/#profilepage',
      url: 'https://alekha1234.github.io/gujurialekha.github.io/',
      name: 'Alekha Gujuri Profile',
      isPartOf: {
        '@id': 'https://alekha1234.github.io/gujurialekha.github.io/#website',
      },
      mainEntity: {
        '@id': 'https://alekha1234.github.io/gujurialekha.github.io/#person',
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://alekha1234.github.io/gujurialekha.github.io/#person',
      name: 'Alekha Gujuri',
      additionalName: 'Gujuri Alekha',
      jobTitle: 'Associate Data Scientist',
      worksFor: {
        '@type': 'Organization',
        name: 'Trinity Mobility',
        url: 'https://www.trinitymobility.com/',
      },
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'Lovely Professional University',
        },
        {
          '@type': 'CollegeOrUniversity',
          name: 'Science Degree College',
        },
      ],
      url: 'https://alekha1234.github.io/gujurialekha.github.io/',
      image: 'https://alekha1234.github.io/gujurialekha.github.io/documents/logos/headshot.png',
      description: personalData.shortBio,
      knowsAbout: [
        'Machine Learning',
        'Data Science',
        'Time-Series Forecasting',
        'Smart City IoT',
        'Deep Learning',
        'Computer Vision',
        'FastAPI Microservices',
        'MLOps & Nexus',
        'Python',
        'Scikit-Learn',
        'TensorFlow',
      ],
      sameAs: [
        'https://github.com/alekha1234',
        'https://www.linkedin.com/in/gujuri-alekha/',
        'https://www.kaggle.com/gujurialekha',
        'https://x.com/Alekha81293434',
        'https://alekhagujuri.blogspot.com/',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://alekha1234.github.io/gujurialekha.github.io/#breadcrumbs',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://alekha1234.github.io/gujurialekha.github.io/',
        },
      ],
    },
  ],
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
        {/* Schema.org 2026 Unified Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
