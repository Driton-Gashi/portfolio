"use client";

import LanguageSwitcher from "./LanguageSwitcher";

const FloatingLocaleSwitcher = () => {
  return (
    <div className="fixed right-6 bottom-12 z-[5001]">
      <div className="rounded-full border border-white/[.12] bg-[#0d1024]/80 p-1 shadow-lg backdrop-blur-md">
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default FloatingLocaleSwitcher;
