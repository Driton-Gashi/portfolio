import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import { Analytics } from "@/components/Analytics";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://dritongashi.com"),
  title: {
    default: "Driton Gashi | Web Developer",
    template: "Driton Gashi | %s",
  },
  description:
    "Driton Gashi is a web developer building fast, modern websites and web applications with Next.js, React, and WordPress. Explore selected projects and experience.",
  applicationName: "Driton Gashi Portfolio",
  authors: [{ name: "Driton Gashi", url: "https://dritongashi.com" }],
  creator: "Driton Gashi",
  publisher: "Driton Gashi",
  keywords: [
    "Driton Gashi",
    "Driton Gashi web developer",
    "web developer",
    "freelance web developer",
    "frontend developer",
    "Next.js developer",
    "React developer",
    "WordPress developer",
    "web design",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "/",
      en: "/",
      de: "/de",
      sq: "/sq",
    },
  },
  openGraph: {
    type: "website",
    url: "https://dritongashi.com",
    siteName: "Driton Gashi",
    title: "Driton Gashi | Web Developer",
    description:
      "Web developer building modern websites and web applications with Next.js, React, and WordPress.",
    locale: "en_US",
    images: [{ url: "/favicon.png", width: 512, height: 512, alt: "Driton Gashi" }],
  },
  twitter: {
    card: "summary",
    title: "Driton Gashi | Web Developer",
    description:
      "Web developer building modern websites and web applications with Next.js, React, and WordPress.",
    images: ["/favicon.png"],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  const { locale = "en" } = await params;
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Driton Gashi",
    url: "https://dritongashi.com",
    jobTitle: "Web Developer",
    image: "https://dritongashi.com/favicon.png",
    email: "dritongashi1995@gmail.com",
    sameAs: [
      "https://github.com/Driton-Gashi",
      "https://www.linkedin.com/in/dritoni-gashi/",
      "https://www.instagram.com/driton_.gashi/",
    ],
    knowsAbout: ["Web development", "Next.js", "React", "WordPress", "TypeScript"],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        ) : null}
      </head>
      <body className={inter.className}>
        {children}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}

