"use client";
import React, { useEffect, useState } from "react";
import useProfile from "../../../../components/UseProfile";
import UserTabs from "@/components/UserTabs";
import toast from "react-hot-toast";
import Link from "next/link";
import ArrowLeft from "../../../../components/icons/ArrowLeft";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "../../../../components/MenuItemForm";
import DeleteButton from "../../../../components/DeleteButton";

const EditMenuItemPage = () => {
  const { id } = useParams();
  const { loading, data: isAdmin } = useProfile();
  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);

  useEffect(() => {
    fetch("/api/menu-items").then((response) =>
      response.json().then((data) => {
        const itemForEdit = data.find((item) => item._id === id);

        setMenuItem(itemForEdit); 
      })
    );
  }, []);

  async function handleFormSubmit(e, data) {
    e.preventDefault();

    data = { ...data, _id: id };

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving item ...",
      success: "Saved item successfully",
      error: "Saving item failed",
    });

    setRedirectToItems(true);
  }

  const handleDeleteMenuItem = ()=>{
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items?id=" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    toast.promise(promise, {
      loading: "Deleting item...",
      success: "Item deleted!",
      error: "Error",
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) return redirect("/menu-items");
  if (loading) return "Loading...";
  if (!isAdmin) return "NOT AN ADMIN";
  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={isAdmin} />
      <div className="mt-8">
        <Link href={"/menu-items"} className="button flex">
          <ArrowLeft />
          <span>Go back to all items</span>
        </Link>
      </div>

      <MenuItemForm onSubmit={handleFormSubmit} menuItem={menuItem} />
      <div className="max-w-[22rem] ml-auto mt-4">
        <div className=" max-w-[22rem] ml-auto pl-2">
          <DeleteButton label={'Delete'} onDelete={handleDeleteMenuItem}/>

        {/* <button onClick={()=>handleDeleteMenuItem(id)} type="button">Delete</button> */}
        </div>
      </div>
    </section>
  );
};

export default EditMenuItemPage;
