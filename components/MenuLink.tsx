import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";

const MenuLink = () => {
  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black text-base">
      <li className="cursor-pointer hover:text-primary">
        <Link href="/">Home</Link>
      </li>
      <li className="cursor-pointer hover:text-primary">
        <Link href="/dashboard">Dashboard</Link>
      </li>
    </ul>
  );
};

export default MenuLink;
