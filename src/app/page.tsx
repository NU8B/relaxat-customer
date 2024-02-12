"use client";

import NavBar from "./ui/home/nav-bar";
import SideBar from "./ui/home/side-bar";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <SideBar />
      </main>
    </>
  );
}
