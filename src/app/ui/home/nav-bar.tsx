"use client";

import Link from "next/link";
import SearchBox from "./search-box";
import UserBox from "./user-box";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center pt-3 ps-5">
      <div className="logo-searchbox flex gap-[10rem] items-center">
        <Link className="uppercase logo-color font-bold text-3xl" href="/">
          Relaxat
        </Link>
        {/*<SearchBox />*/}
      </div>
      <UserBox />
    </nav>
  );
}
