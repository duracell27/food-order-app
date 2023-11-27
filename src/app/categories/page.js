"use client";
import UserTabs from "../../components/UserTabs";
import React, { useEffect, useState } from "react";
import useProfile from "../../components/UseProfile";
import toast from "react-hot-toast";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);
  const { loading, data: isAdmin } = useProfile();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const creatingPromise = new Promise(async (resolve, reject) => {
      const data = { name: category };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      setCategory("");
      fetchCategories();
      setEditedCategory(null);
      if (response.ok) {
        resolve();
      } else {
        reject();
      }

      await toast.promise(creatingPromise, {
        loading: editedCategory ? "Editing category" : "Creating category",
        success: editedCategory ? "Edit successful" : "Successfully created",
        error: editedCategory
          ? "Error editing category"
          : "Error creating category",
      });
    });
  };

  if (loading) return "Loading user info...";
  if (!isAdmin) return "NOT AN ADMIN";

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={isAdmin} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? "Edit category" : "New category name"}
              {editedCategory && (
                <>
                  :<strong>{editedCategory.name}</strong>{" "}
                </>
              )}
              <input
                type="text"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />
            </label>
          </div>
          <div className="pb-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? "Edit" : "Create"}
            </button>
          </div>
        </div>
      </form>
      <div className="">
        <h2 className="mt-8 text-sm text-gray-500">Edit category:</h2>
        {categories?.length > 0 &&
          categories.map((category) => (
            <button
              onClick={() => {
                setEditedCategory(category);
                setCategory(category.name);
              }}
              className="bg-gray-200 rounded-xl p-2 px-4 flex gap-1 cursor-pointer mb-2"
            >
              <span>{category.name}</span>
            </button>
          ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
