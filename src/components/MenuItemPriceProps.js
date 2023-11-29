"use client";
import React, { useState } from "react";
import Trash from "../components/icons/Trash";
import Plus from "../components/icons/Plus";
import Up from "../components/icons/Up";
import Down from "../components/icons/Down";

const MenuItemPriceProps = ({ name, props, setProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const addProp = () => {
    setProps((oldProp) => {
      return [...oldProp, { name: "", price: 0 }];
    });
  };

  const editProps = (e, indx, prop) => {
    const newValue = e.target.value;

    setProps((prevProp) => {
      const newSizes = [...prevProp];
      newSizes[indx][prop] = newValue;

      return newSizes;
    });
  };

  const removeProp = (indx) => {
    setProps((prevProps) => prevProps.filter((v, i) => i !== indx));
  };
  return (
    <div className="bg-gray-200 p-2 mb-2 rounded-md ">
      <div>
        <div className="flex justify-between  ">
          <div className="">
            <span className="grow text-gray-700">{name}s </span>
            <span className="text-gray-400">({props?.length})</span>
          </div>

          <div className="">
            <button
              type="button"
              className="p-1 bg-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <Up /> : <Down />}
            </button>
          </div>
        </div>
        <div className={isOpen ? "block" : "hidden"}>
          {props?.length > 0 &&
            props.map((size, indx) => (
              <div className="flex gap-2 items-end">
                <label>
                  {name} name{" "}
                  <input
                    type="text"
                    value={size.name}
                    placeholder={`${name} name`}
                    onChange={(e) => editProps(e, indx, "name")}
                  />
                </label>
                <label>
                  {name} price{" "}
                  <input
                    type="text"
                    value={size.price}
                    placeholder={`${name} price`}
                    onChange={(e) => editProps(e, indx, "price")}
                  />
                </label>
                <div className="">
                  <button
                    type="button"
                    onClick={() => removeProp(indx)}
                    className="bg-white mb-2 px-2"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <button
            type="button"
            className="bg-white flex items-center"
            onClick={addProp}
          >
            <Plus /> <span>Add item {name}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemPriceProps;
