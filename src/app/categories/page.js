"use client";
import UserTabs from "../../components/UserTabs";
import React, { useEffect, useState } from "react";
import useProfile from "../../components/UseProfile";
import toast from "react-hot-toast";
import DeleteButton from '../../components/DeleteButton'

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

  const handleDeleteCategory = async (id) => {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?id=" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted!",
      error: "Error",
    });

    fetchCategories();
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
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? "Edit" : "Create"}
            </button>
            <button onClick={()=>{setEditedCategory(null)
            setCategory('')}} type="button">Cancel</button>
          </div>
        </div>
      </form>
      <div className="">
        <h2 className="mt-8 text-sm text-gray-500">Existing categories:</h2>
        {categories?.length > 0 &&
          categories.map((category, indx) => (
            <div key={indx} className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1  mb-2">
              <div className="grow flex items-center">
                <div className="">{category.name}</div>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(category);
                    setCategory(category.name);
                  }}
                >
                  Edit
                </button>
                <DeleteButton label={'Delete'} onDelete={() => handleDeleteCategory(category._id)}/>
                {/* <button
                  type="button"
                  onClick={() => handleDeleteCategory(category._id)}
                >
                  Delete
                </button> */}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
