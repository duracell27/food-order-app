'use client'
import React from 'react'

const MenuItemTile = ({onAddToCart, ...item}) => {
    const {image, description, name, basePrice} = item
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-2xl hover:shadow-black/25">
        <div className="text-center">
          <img
            src={image}
            className="max-h-auto max-h-36 block mx-auto"
            alt="pizza"
          />
        </div>
        <h4 className="font-semibold text-xl my-2">{name}</h4>
        <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
        <button
          onClick={onAddToCart}
          className="bg-primary mt-3 rounded-full text-white px-8 py-2"
        >
          Add to cart ${basePrice}
        </button>
      </div>
  )
}

export default MenuItemTile