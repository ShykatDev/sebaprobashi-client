"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon
} from "@heroicons/react/16/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  
  
  {
    id: 1,
    lang: "EN",
    imgSrc: "/assets/en.png",
  },
  {
    id: 2,
    lang: "BN",
    imgSrc: "/assets/bn.png",
  },
  {
    id: 3,
    lang: "SA",
    imgSrc: "/assets/sa.png",
  },
];

export default function LanguageDropdown() {
  const [defaultLang, setDefaultLang] = useState(languages[0]);
  const { i18n } = useTranslation();

  const handleChangeLang = (lang) => {
    const selectLang = languages.find((item) => item.lang === lang);
    localStorage.setItem("lang", JSON.stringify(selectLang));
    setDefaultLang(selectLang);
    i18n.changeLanguage(lang.toLowerCase());
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("lang");
      if (savedLang) {
        setDefaultLang(JSON.parse(savedLang));
      }
    }
  }, []);

  return (
    <div className="w-fit">
      <Menu>
        <MenuButton
          className={"py-2 transition-all duration-200 flex items-center gap-2"}
          //   onClick={() => changeLanguage(i18n.language === "en" ? "bn" : "en")}
        >
          <Image
            alt="lang"
            src={defaultLang.imgSrc}
            width={40}
            height={40}
            priority
            className="size-5"
          />
          <span className="text-white">{defaultLang.lang}</span>
          <ChevronDownIcon className="size-4 text-white flex-shrink-0" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-fit origin-top-right rounded-xl border border-background/30 bg-primary p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {languages.map((item, i) => {
            return (
              <MenuItem key={i} onClick={() => handleChangeLang(item.lang)}>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                  <Image
                    alt="lang"
                    src={item.imgSrc}
                    width={40}
                    height={40}
                    priority
                    className="size-5"
                  />
                  <span className="text-white">{item.lang}</span>
                </button>
              </MenuItem>
            );
          })}
        </MenuItems>
      </Menu>
    </div>
  );
}
