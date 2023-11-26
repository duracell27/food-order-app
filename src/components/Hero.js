import React from "react";
import Image from "next/image";
import ArrowRight from "./icons/ArrowRight";

const Hero = () => {
  return (
    <section className="hero mt-4">
      <div className="py-12">
        <h1 className="text-4xl font-semibold">Everything is better with a <span className="text-primary">Pizza</span> </h1>
        <p className="my-6 text-gray-500 text-sm">
          Delicious pizzas, crafted with love & top-quality ingredients. Join us
          for a taste adventure!
        </p>
        <div className="flex gap-4 text-sm">
          <button className="bg-primary uppercase flex justify-center gap-2 text-white  items-center px-4 py-2 rounded-full">
            Order now <ArrowRight/>
          </button>
          <button className="flex gap-2 py-2 border-0 text-gray-600 font-semibold">Learn more <ArrowRight/></button>
        </div>
      </div>

      <div className="relative">
        <Image
          src={"/pizza.png"}
          alt="pizza"
          fill='true'
          style={{objectFit: "contain"}}
        />
      </div>
    </section>
  );
};

export default Hero;
