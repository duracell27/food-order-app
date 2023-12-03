"use client";
import React, { useContext, useEffect, useState } from "react";
import SectionHeader from "../../components/SectionHeaders";
import { CartContext, cartProductPrice } from "../../components/AppContext";
import Image from "next/image";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/AddressInputs";
import useProfile from "@/components/UseProfile";

const Cart = () => {
  const [address, setAddress] = useState({});
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (profileData?.city) {
      const { streetAddress, phone, zipCode, city, country } = profileData;
      const addressFromProfile = {
        streetAddress,
        phone,
        zipCode,
        city,
        country,
      };

      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }
  
  function handleAddressChange(propName, value) {
    setAddress((prevAdr) => {
      return { ...prevAdr, [propName]: value };
    });
  }
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeader mainHeader={"Cart"} />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="">
          {cartProducts?.length === 0 && (
            <div className="">No products in your shopping cart</div>
          )}
          {cartProducts.length > 0 &&
            cartProducts.map((product, indx) => (
              <div className="flex gap-4 mb-2 border-b py-2 items-center ">
                <div className="w-24">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={240}
                    height={240}
                  />
                </div>

                <div className="grow">
                  <h3 className="text-semibold">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm text-gray-700">
                      Size: <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.ingredients?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {product.ingredients.map((extra) => (
                        <div className="">
                          {extra.name} ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  ${cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    type="button "
                    onClick={() => removeCartProduct(indx)}
                    className="p-2"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className="py-4 text-right pr-16">
            <span className="text-gray-500">Subtotal:</span>{" "}
            <span className="text-lg font-semibold pl-2">{total}</span>
          </div>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form action="">
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay $ price</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Cart;
