"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import Image from "next/image";

import { CircleUserRound, Menu } from "lucide-react";
import { MdOutlineShoppingCart } from "react-icons/md";
import MenuLink from "./MenuLink";
import MenuMobile from "./MenuMobile";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const controlNavbar = () => {
    if (window.scrollY > 500) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);
  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 shadow-sm sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        <div className="flex-1">
          <Link href="/">
            <Image
              src="/shop-logo.png"
              alt="logo"
              width={200}
              height={100}
              priority
              className="w-[50px] md:w-[80px]"
            />
          </Link>
        </div>

        <div className="flex-1 gap-1 flex justify-end items-center">
          {/* <SearchModal /> */}
          {mobileMenu && <MenuMobile setMobileMenu={setMobileMenu} />}
          <div className="flex items-center gap-4 text-black relative">
            <div className="hidden lg:block">
              <MenuLink />
            </div>
            {/* Icon start */}
            <Link href="/">
              <div className="w-8 md:w-10 h-8 md:h-10 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                <MdOutlineShoppingCart className="text-[25px] mr-1" />

                <div className="h-[18px] md:h-[22px] min-w-[18px] md:min-w-[22px] rounded-full bg-slate-500 absolute top-0 left-4 md:left-6 text-white text-[12px] md:text-[14px] flex justify-center items-center px-[2px] md:px-[5px]">
                  0
                </div>
              </div>
            </Link>
            {/* Icon end */}

            {/* Mobile icon start */}
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex lg:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
              {mobileMenu ? (
                <VscChromeClose
                  className="text-[16px]"
                  onClick={() => setMobileMenu(false)}
                />
              ) : (
                <BiMenuAltRight
                  className="text-[20px]"
                  onClick={() => setMobileMenu(true)}
                />
              )}
            </div>
            {/* Mobile icon end */}
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
