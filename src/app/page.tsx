"use client";
import NavBar from "./ui/nav-bar";
import SideBar from "./ui/side-bar";

export default function Home() {
  // Redirect immediately
  window.location.href = "/signin";

  // The rest of the component won't execute

  return (
    <>
      <NavBar />
      <main>
        <SideBar />
      </main>
    </>
  );
}
