import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { personalData } from '@/data/personal';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'optional', // no late font swap, so the centered hero never shifts (CLS)
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'optional',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'optional',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gujurialekha.github.io/'),
  title: {
    default: 'Gujuri Alekha | Data Scientist & AI / ML Engineer',
    template: '%s | Gujuri Alekha',
  },
  description:
    'Portfolio of Gujuri Alekha — Associate Data Scientist with 2.5 years of experience across predictive modeling, time-series forecasting, smart city IoT, and MLOps pipelines.',
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
  authors: [{ name: 'Gujuri Alekha', url: 'https://github.com/gujurialekha' }],
  creator: 'Gujuri Alekha',
  alternates: {
    canonical: 'https://gujurialekha.github.io/',
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
    url: 'https://gujurialekha.github.io/',
    title: 'Gujuri Alekha | Data Scientist & AI / ML Engineer',
    description:
      'Transforming complex observational data into deterministic predictive systems. Explore production case studies, research code, and ML benchmarks.',
    siteName: 'Gujuri Alekha',
    images: [
      {
        url: 'https://gujurialekha.github.io/documents/logos/profile-img.png',
        width: 800,
        height: 800,
        alt: 'Gujuri Alekha — Associate Data Scientist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gujuri Alekha | Data Scientist & AI / ML Engineer',
    description:
      'Explore machine learning case studies, deep learning vision models, time-series pipelines, and applied data science systems.',
    creator: '@Alekha81293434',
    images: ['https://gujurialekha.github.io/documents/logos/profile-img.png'],
  },
  icons: {
    icon: [`${basePath}/favicon.ico`, `${basePath}/favicon-48.png`],
    apple: `${basePath}/apple-touch-icon.png`,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://gujurialekha.github.io/#website',
      url: 'https://gujurialekha.github.io/',
      name: 'Gujuri Alekha',
      description:
        'Portfolio of Gujuri Alekha — Associate Data Scientist specializing in time-series forecasting, multi-stage ML pipelines, smart city IoT systems, and MLOps.',
      publisher: {
        '@id': 'https://gujurialekha.github.io/#person',
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://gujurialekha.github.io/#profilepage',
      url: 'https://gujurialekha.github.io/',
      name: 'Gujuri Alekha Profile',
      isPartOf: {
        '@id': 'https://gujurialekha.github.io/#website',
      },
      mainEntity: {
        '@id': 'https://gujurialekha.github.io/#person',
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://gujurialekha.github.io/#person',
      name: 'Gujuri Alekha',
      alternateName: 'Alekha Gujuri',
      email: 'mailto:gujurialekha@gmail.com',
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
      url: 'https://gujurialekha.github.io/',
      image: 'https://gujurialekha.github.io/documents/logos/profile-img.png',
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
        'https://github.com/gujurialekha',
        'https://www.linkedin.com/in/gujurialekha/',
        'https://www.kaggle.com/gujurialekha',
        'https://x.com/Alekha81293434',
        'https://gujurialekha.github.io/blog/',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://gujurialekha.github.io/#breadcrumbs',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://gujurialekha.github.io/',
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
    <html lang="en">
      <head>
        {/* Google Analytics, loaded on the first interaction so its 175 KB never competes with page load.
            ponytail: visitors who leave without scrolling/tapping aren't counted; load on idle if that matters. */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var id = '${personalData.analytics.googleAnalyticsId}';
                var events = ['pointerdown', 'keydown', 'scroll', 'touchstart', 'wheel'];
                function load() {
                  events.forEach(function (e) { removeEventListener(e, load); });
                  var s = document.createElement('script');
                  s.async = true;
                  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
                  document.head.appendChild(s);
                  window.dataLayer = window.dataLayer || [];
                  window.gtag = function () { dataLayer.push(arguments); };
                  gtag('js', new Date());
                  gtag('config', id);
                }
                events.forEach(function (e) { addEventListener(e, load, { passive: true }); });
              })();
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
