"use client";

import Link from "next/link";
import UserBox from "./user-box";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center pt-3 ps-5">
      <Link className="uppercase logo-color font-bold text-3xl" href="/">
        Relaxat
      </Link>
      <UserBox />
    </nav>
  );
}
