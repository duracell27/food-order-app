"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import {signIn} from "next-auth/react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [userLogining, setUserLogining] = useState(false);
    const [error, setError] = useState(false);

    const handleFormSubmit = async(e)=>{
        e.preventDefault();
    
        setUserLogining(true);
        await signIn('credentials', {email, password, callbackUrl:'/'})
        setUserLogining(false);
        
    }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>

      {/* {userCreated && (
        <div className="my-4 text-center">
          User created. <br /> Now you can{" "}
          <Link href={"/login"} className="underline color-privary">
            login
          </Link>
        </div>
      )}

      {error && (
        <div className="my-4 text-center">
          User creatting Error. <br />
          Try again later or use enother email
        </div>
      )} */}

      <form className="block max-w-xl mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name='email'
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={userLogining}
        />
        <input
          type="password"
          placeholder="Password"
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={userLogining}
        />
        <button disabled={userLogining} type="submit">
          Login
        </button>
        <div className="my-4 text-center text-gray-500">or</div>
        <button type='button' disabled={userLogining} onClick={()=>signIn('google', {callbackUrl: '/'})} className="flex gap-4 justify-center">
          <Image src={"/google.png"} alt="googleicon" width={24} height={24} />{" "}
          Login with Google
        </button>
        <div className="text-center py-4">
          Don`t have an account? Pleace <Link className="text-primary underline" href={'/login'}>register</Link>
        </div>
      </form>
    </section>
  )
}

export default LoginPage