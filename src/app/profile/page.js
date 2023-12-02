"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import UserTabs from "../../components/UserTabs";
import UserForm from "../../components/UserForm";

const ProfilePage = () => {
  const session = useSession();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile", { method: "GET" }).then((response) => {
        response.json().then((data) => {
          setUser(data);
          setIsAdmin(data.isAdmin);
        });
      });
    }
  }, [session, status]);

  if (status === "loading") {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const handleProfileUpdate = async (e, data) => {
    e.preventDefault();
    toast("Saving...");
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("Profile saved!");
    } else {
      toast.error("Saving error(");
    }
  };

  // const handleFileChange = async (e) => {
  //   e.preventDefault();

  //   const files = e.target.files;
  //   if (files.length === 1) {
  //     const data = new FormData();
  //     data.set("file", files[0]);

  //     toast("Uploading ...");
  //     const uploadPromise = fetch("/api/upload", {
  //       method: "POST",
  //       body: data,
  //     }).then((response) => {
  //       if (response.ok) {
  //         return response.json().then((link) => setImage(link));
  //       }
  //       throw new Error("Something went wrong");
  //     });

  //     await toast.promise(uploadPromise, {
  //       loading: "Uploading ...",
  //       success: "Uploading completed successfully",
  //       error: "Upload error",
  //     });
  //   }
  // };

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />

      <div className="max-w-md mx-auto ">
        <UserForm user={user} onSave={handleProfileUpdate} />
      </div>
    </section>
  );
};

export default ProfilePage;
