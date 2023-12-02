"use client";
import React, { useContext } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { CartContext } from "./AppContext";
import Cart from "./icons/Cart";

const Header = () => {
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user;
  const username = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  return (
    <header className="flex items-center justify-between">
      <nav className="flex gap-8 text-gray-500 items-center font-semibold">
        <Link className="text-primary font-semibold text-2xl" href="/">
          ST PIZZA
        </Link>
        <Link href={"/"}>Home</Link>
        <Link href={"/menu"}>Menu</Link>
        <Link href={"/#about"}>About</Link>
        <Link href={"/#contact"}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status === "authenticated" && (
          <>
            <Link className="whitespace-nowrap" href="/profile">
              {username}
            </Link>
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

        <Link className="relative" href={"/cart"}>
          <Cart />
          <span className="bg-primary block text-white  rounded-full w-6 h-6 text-center absolute right-[-10px] top-[-10px]">
              {cartProducts.length}
            </span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
