import React, { useState } from "react";
import EditableImage from "@/components/EditableImage";
import MenuItemPriceProps from '../components/MenuItemPriceProps'


const MenuItemForm = ({ onSubmit, menuItem }) => {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");

  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [ingredients, setIngredients] = useState(menuItem?.ingredients || []);



  return (
    <form
      className="mt-8 max-w-md mx-auto"
      onSubmit={(e) => {
        onSubmit(e, { image, name, description, basePrice, sizes,ingredients });
      }}
    >
      <div
        className="grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div className="">
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>
            Item name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </label>
          <label>
            Description
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            />
          </label>
          <label>
            Base price
            <input
              value={basePrice}
              onChange={(e) => setBasePrice(parseInt(e.target.value))}
              type="text"
            />
          </label>
          <MenuItemPriceProps name={'Size'} props={sizes} setProps={setSizes}/>
          <MenuItemPriceProps name={'Ingredient'} props={ingredients} setProps={setIngredients}/>
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
};

export default MenuItemForm;
