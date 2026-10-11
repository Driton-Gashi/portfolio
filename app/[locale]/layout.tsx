import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "../provider";

import { routing } from "@/i18n/routing";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";

const localeMetadata = {
  en: {
    title: "Web Developer",
    description:
      "Explore the portfolio of Driton Gashi, a web developer creating modern websites and web applications with Next.js, React, and WordPress.",
  },
  de: {
    title: "Webentwickler",
    description:
      "Entdecken Sie das Portfolio von Driton Gashi, Webentwickler für moderne Websites und Webanwendungen mit Next.js, React und WordPress.",
  },
  sq: {
    title: "Zhvillues Web",
    description:
      "Shikoni portofolin e Driton Gashit, zhvillues web për faqe moderne dhe aplikacione me Next.js, React dhe WordPress.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = localeMetadata[locale as keyof typeof localeMetadata] ?? localeMetadata.en;
  const canonical = locale === "en" ? "/" : `/${locale}`;

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical,
      languages: {
        "x-default": "/",
        en: "/",
        de: "/de",
        sq: "/sq",
      },
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: canonical,
      locale: locale === "de" ? "de_DE" : locale === "sq" ? "sq_XK" : "en_US",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </ThemeProvider>
  );
}
