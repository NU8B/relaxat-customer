"use client";

import Link from "next/link";

export default function UserBox() {
  return (
    <div>
      <Link href="/signin">
        <button
          type="button"
          className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
        >
          Sign In
        </button>
      </Link>
      <Link href="/signup">
        <button type="button" className="hover:underline px-5 py-2.5">
          Sign Up
        </button>
      </Link>
    </div>
  );
}
