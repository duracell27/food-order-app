import React, { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
import Image from "next/image";

const MenuItem = (menuItem) => {
  const { image, name, description, basePrice, sizes, ingredients } = menuItem;
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const { addToCart } = useContext(CartContext);
  function addToCartButtonClick() {
    if(showPopUp){
      addToCart(menuItem, selectedSize, selectedIngredients)
      
      toast.success("Added to cart");
      setShowPopUp(false)
      
    }
    if (sizes.length === 0 && ingredients.length === 0) {
      addToCart(menuItem);
      toast.success("Added to cart");
    } else {
      setShowPopUp(true);
    }
  }

  function handleExtrasClick(e, extraItem) {
    const checked = e.target.checked;
    if (checked) {
      setSelectedIngredients((prev) => {
        return [...prev, extraItem];
      });
    } else {
      setSelectedIngredients((prev) => {
        return prev.filter((extra) => extra.name !== extraItem.name);
      });
    }
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedIngredients?.length > 0) {
    for (const extra of selectedIngredients) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {showPopUp && (
        <div onClick={()=>setShowPopUp(false)} className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div onClick={(e)=>e.stopPropagation()} className="my-8 bg-white p-2 rounded-lg max-w-lg ">
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "90vh" }}
            >
              <Image
                src={image}
                alt={name}
                width={300}
                height={200}
                className="mx-auto"
              ></Image>
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>
              {sizes.length > 0 && (
                <div className="p-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {sizes.map((size) => (
                    <label className="flex items-center gap-2 p-4 border rounded-md mb-1">
                      <input
                        onClick={() => {
                          setSelectedSize(size);
                        }}
                        checked={size.name === selectedSize?.name}
                        type="radio"
                        name="size"
                      />{" "}
                      {size.name} ${basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}
              {ingredients.length > 0 && (
                <div className="p-2">
                  <h3 className="text-center text-gray-700">
                    Pick your extra ingredients
                  </h3>
                  {ingredients.map((ingredient) => (
                    <label className="flex items-center gap-2 p-4 border rounded-md mb-1">
                      <input
                        onClick={(e) => {
                          handleExtrasClick(e, ingredient);
                        }}
                        type="checkbox"
                        name={ingredient.name}
                      />{" "}
                      {ingredient.name} +${ingredient.price}
                    </label>
                  ))}
                </div>
              )}
              <button onClick={addToCartButtonClick} className="primary sticky bottom-2" type="button">
                Add to cart ${selectedPrice}
              </button>
              <button onClick={()=>setShowPopUp(false)} className="mt-2" type="button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={addToCartButtonClick} {...menuItem} />
    </>
  );
};

export default MenuItem;
