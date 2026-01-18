"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const locales = ["en", "sq", "de"];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = useLocale();

  return (
    <div className="flex items-center rounded-full border border-white/[.2] p-1 gap-1">
      {locales.map((locale) => {
        const newPathname = pathname.replace(`/${currentLocale}`, `/${locale}`);

        return (
          <Link
            key={locale}
            href={newPathname}
            aria-label={`Switch language to ${locale.toUpperCase()}`}
            className={`px-2 py-1 rounded-full text-[11px] tracking-wide uppercase transition ${
              currentLocale === locale
                ? "bg-white/10 text-white"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
