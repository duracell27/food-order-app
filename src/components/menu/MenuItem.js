import React from "react";

const MenuItem = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-2xl hover:shadow-black/25">
      <div className="text-center">
        <img src="pizza.png" className="max-h-auto max-h-36 block mx-auto" alt="pizza" />
      </div>
      <h4 className="font-semibold text-xl my-2">Papperony Pizza</h4>
      <p className="text-gray-500 text-sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </p>
      <button className="bg-primary mt-3 rounded-full text-white px-8 py-2">
        Add to cart $12
      </button>
    </div>
  );
};

export default MenuItem;
