import React from "react";
import Link from "next/link";
const MenuMobile = ({ setMobileMenu }: any) => {
  return (
    <ul className="flex flex-col lg:hidden font-bold absolute top-[50px] md:top-[80px] left-0 w-full bg-white border-t border-b shadow-md text-black">
      <li className="py-4 px-5">
        <Link href="/" onClick={() => setMobileMenu(false)}>
          Home
        </Link>
      </li>
      <li className="py-4 px-5">
        <Link href="/dashboard" onClick={() => setMobileMenu(false)}>
          Dashboard
        </Link>
      </li>
    </ul>
  );
};

export default MenuMobile;
