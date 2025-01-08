"use client";

import useAuth from "@/hooks/useLogin";
import { NavbarOptions } from "@/utils/options";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LanguageDropdown from "./LanguageDropdown";
import Logo from "./Logo";

const Navbar = () => {
  const pathName = usePathname();
  const { t } = useTranslation();
  const [mobileNav, setMobileNav] = useState(false);
  const { isLogin, onLogout } = useAuth()

  return (
    <nav className="bg-background">
      <div className="">
        <div className="lg:flex items-center justify-between md:pt-2 px-6 hidden">
          <Logo />
          {/* <AudioControl className={"hidden md:block"} /> */}
        </div>

        {/* Desktop Nav */}
        <div className="bg-primary mt-4 h-fit lg:flex flex-col md:flex-row justify-between md:items-center pr-6 pb-6 lg:pb-0 border-l border-primary hidden">
          <div>
            {NavbarOptions.map((option, i) => {
              return (
                <>
                  
                    <Link
                      href={option.url}
                      key={i}
                      className={`px-6 hover:bg-background hover:text-primary py-4 inline-block transition-all duration-200 ${pathName === option.url
                        ? "bg-white text-primary"
                        : "text-white/[0.9]"
                        }`}
                    >
                      {t(`NAVBAR.${option.title}`)}
                    </Link>
                </>
              )
            }
            )}
          </div>
          <div className="flex items-center gap-4 pl-4 relative flex-shrink-0">
            <LanguageDropdown />

            {isLogin ? (
              <Link href="/login" onClick={() => onLogout()}>
                <button className=" py-2 px-4 bg-background hover:bg-white text-primary rounded-md transition-all duration-200">
                  {t("NAVBAR.LOGOUT")}
                </button>
              </Link>
            ) : (
              <Link href="/login">
                <button className="py-2 px-4 bg-background hover:bg-white text-primary rounded-md transition-all duration-200">
                  {t("NAVBAR.LOGIN")}
                </button>
              </Link>
            )}


          </div>
        </div>

        {/* mobile Nav */}
        <div className="lg:hidden bg-primary px-4 py-3 flex items-center gap-4 justify-between">
          <Logo className={"text-white"} />
          <div className="flex items-center gap-3">
            <LanguageDropdown />
            <button className="" onClick={() => setMobileNav(!mobileNav)}>
              <Bars3Icon className="text-white size-8" />
            </button>
          </div>
        </div>
        <div
          className={`lg:hidden bg-primary transition-all duration-200 py-2 overflow-hidden ${mobileNav ? "max-h-fit" : "max-h-0"
            }`}
        >
          <div className="flex flex-col">
            {NavbarOptions.map((option, i) => {
              return (
                <Link
                  href={option.url}
                  onClick={() => setMobileNav(false)}
                  key={i}
                  className={`px-6 hover:bg-background hover:text-primary py-3 inline-block transition-all duration-200 ${pathName === option.url
                    ? "bg-white text-primary"
                    : "text-white/[0.9]"
                    }`}
                >
                  {t(`NAVBAR.${option.title}`)}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-row items-center bg-white/[0.2] py-2 gap-4 px-6">
            {isLogin ? (
              <Link href="/login" onClick={() => onLogout()}>
                <button className="py-2 px-4 bg-background hover:bg-white text-primary rounded-md transition-all duration-200">
                  {t("NAVBAR.LOGOUT")}
                </button>
              </Link>
            ) : (
              <Link href="/login">
                <button className="py-2 px-4 bg-background hover:bg-white text-primary rounded-md transition-all duration-200">
                  {t("NAVBAR.LOGIN")}
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
