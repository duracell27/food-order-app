"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [userCreating, setUserCreating] = useState(false);
  const [error, setError] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setError(false);
    setUserCreating(false);

    setUserCreating(true);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setUserCreated(true);
    }
    if (!response.ok) {
      setError(true);
    }
    setUserCreating(false);
    setEmail('')
    setPassword('')
  };
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>

      {userCreated && (
        <div className="my-4 text-center">
          User created. <br /> Now you can{" "}
          <Link href={"/login"} className="underline color-privary">
            login
          </Link>
        </div>
      )}

      {error && (
        <div className="my-4 text-center">
          User creating Error. <br />
          Try again later or use enother email
        </div>
      )}

      <form className="block max-w-xl mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={userCreating}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={userCreating}
        />
        <button disabled={userCreating} type="submit">
          Register
        </button>
        <div className="my-4 text-center text-gray-500">or</div>
        <button type="button" disabled={userCreating} onClick={()=>signIn('google', {callbackUrl: '/'})} className="flex gap-4 justify-center">
          <Image src={"/google.png"} alt="googleicon" width={24} height={24} />{" "}
          Login with Google
        </button>
        <div className="text-center py-4">
          Already have an account? Pleace{" "}
          <Link className="text-primary underline" href={"/login"}>
            login
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
