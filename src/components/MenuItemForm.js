import React, { useEffect, useState } from "react";
import EditableImage from "@/components/EditableImage";
import MenuItemPriceProps from '../components/MenuItemPriceProps'


const MenuItemForm = ({ onSubmit, menuItem }) => {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");

  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [ingredients, setIngredients] = useState(menuItem?.ingredients || []);
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(menuItem?.category || '');

  useEffect(()=>{
    fetch('/api/categories/').then(response=>response.json().then(data=>setCategories(data)))
    setCategory(categories[0]?._id)
  },[])

  useEffect(()=>{
    setCategory(categories[0]?._id)
  },[categories])


  return (
    <form
      className="mt-8 max-w-lg mx-auto"
      onSubmit={(e) => {
        onSubmit(e, { image, name, description, basePrice, sizes,ingredients, category });
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
            Category
            <select value={category} onChange={e=>setCategory(e.target.value)}>
              {categories?.length>0 && categories.map(category=>(
                <option value={category._id}>{category.name}</option>
              ))}
            </select>
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
