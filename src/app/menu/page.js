"use client";
import SectionHeaders from "@/components/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import React, { useEffect, useState } from "react";

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch("/api/categories").then((response) =>
      response.json().then((categories) => setCategories(categories))
    );
    fetch("/api/menu-items").then((response) =>
      response.json().then((menuItems) => setMenuItems(menuItems))
    );
  }, []);
  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories.map((category) => (
          <div className="">
            <div className="text-center">
              <SectionHeaders mainHeader={category.name} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 mb-12">
              {menuItems
                .filter((menuItem) => menuItem.category === category._id)
                .map((item) => (
                  <MenuItem {...item} />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
};

export default MenuPage;
