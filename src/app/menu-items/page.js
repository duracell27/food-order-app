"use client";
import React, { useEffect, useState } from "react";
import UserTabs from "@/components/UserTabs";
import useProfile from "../../components/UseProfile";
import Link from "next/link";
import ArrowRight from "../../components/icons/ArrowRight";
import Image from "next/image";

const menuItemsPage = () => {
  const { loading, data: isAdmin } = useProfile();
  const [menuItems, setMenuItens] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((response) =>
      response.json().then((data) => setMenuItens(data))
    );
  }, []);

  if (loading) return "Loading...";
  if (!isAdmin) return "NOT AN ADMIN";
  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={isAdmin} />

      <div className="mt-8">
        <Link href={"/menu-items/new"} className="button flex">
          <span>Create new menu item</span> <ArrowRight />{" "}
        </Link>
      </div>
      <div className="">
        <h2 className="text-sm text-gray-500 mt-4 ">Edit menu item</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((menuItem) => (
              <Link
                href={"/menu-items/edit/" + menuItem._id}
                className=" mb-2 flex-col bg-gray-200 rounded-lg p-4 "
              >
                <div className="relative">
                  <Image
                  className="rounded-md"
                    src={menuItem.image}
                    alt={"itemimg"}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center">{menuItem.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default menuItemsPage;
