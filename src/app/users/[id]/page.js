"use client";
import useProfile from "@/components/UseProfile";
import UserForm from "@/components/UserForm";
import UserTabs from "@/components/UserTabs";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditUserPage = () => {
  const { loading, data: isAdmin } = useProfile();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((response) =>
      response.json().then((user) => {
        setUser(user);
      })
    );
  }, []);

  const handleSaveButton = async (e, data) => {
    e.preventDefault();
    const savePromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (response.ok) {
        resolve();
      } else {
        reject;
      }

      await toast.promise(savePromise, {
        loading: "Saving user ...",
        success: "User saved!",
        error: "Error",
      });
    });
  };

  if (loading) return "Loading...";
  if (!isAdmin) return "NOT AN ADMIN";
  return (
    <section className="mt-8 max-w-xl mx-auto">
      <UserTabs isAdmin={isAdmin} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButton} />
      </div>
    </section>
  );
};

export default EditUserPage;
