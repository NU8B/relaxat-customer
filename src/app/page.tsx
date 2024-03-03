"use client";
import NavBar from "./ui/nav-bar";
import SideBar from "./ui/side-bar";

export default function Home() {
  setTimeout(() => {
    console.log("Redirection initiated to /signin");
    if (typeof window !== "undefined") {
      window.location.href = "/signin";
    }
  }, 100);

  return (
    <>
      <NavBar />
      <main>
        <SideBar />
      </main>
    </>
  );
}
