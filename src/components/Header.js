"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user;
  const username = userData?.name || userData?.email;
  return (
    <header className="flex items-center justify-between">
      <nav className="flex gap-8 text-gray-500 items-center font-semibold">
        <Link className="text-primary font-semibold text-2xl" href="/">
          ST PIZZA
        </Link>
        <Link href={""}>Home</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status === "authenticated" && (
          <>
            <Link className="whitespace-nowrap" href="/profile">{username}</Link>
            <button
              onClick={() => signOut()}
              className="bg-primary rounded-full text-white px-8 py-2"
            >
              Logout
            </button>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link href={"/login"} className="">
              Login
            </Link>
            <Link
              href={"/register"}
              className="bg-primary rounded-full text-white px-8 py-2"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
