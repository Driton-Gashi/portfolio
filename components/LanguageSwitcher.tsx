"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";

const locales = ["en", "sq", "de"];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  return (
    // absolute
    // top: 0;
    // transform: translateY(-140%);
    <div className="absolute flex gap-3 top-0 -translate-y-[125%] xs:translate-y-0 xs:static xs:gap-0">
      {locales.map((locale) => {
        const newPathname = pathname.replace(`/${currentLocale}`, `/${locale}`);

        return (
          <Link
            key={locale}
            href={newPathname}
            className={`px-2 py-1 rounded text-xs hover:opacity-100 ${
              currentLocale === locale ? "" : "opacity-40"
            }`}
          >
            {
              <Image
                className="w-7 xs:w-6"
                width={20}
                height={20}
                src={`/${locale}.svg`}
                alt=""
              />
            }
          </Link>
        );
      })}
    </div>
  );
}
