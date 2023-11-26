"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

const ProfilePage = () => {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState('');
  const { status } = session;
  // const userImage = session.data?.user.image;
  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image)
    }
  }, [session, status]);
  if (status === "loading") {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName, image }),
    });
    setIsSaving(false);
    if (response.ok) {
      setSaved(true);
    }
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const files = e.target.files;
    if (files.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const link = await response.json()
      setImage(link)
      setIsUploading(false)
    }
  };

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      {saved && (
        <h2 className="text-center bg-green-200 p-4 rounded-lg border-green-500">
          Profile saved!
        </h2>
      )}
      {isSaving && (
        <h2 className="text-center bg-blue-200 p-4 rounded-lg border-blue-500">
          Saving...
        </h2>
      )}
      {isUploading && (
        <h2 className="text-center bg-blue-200 p-4 rounded-lg border-blue-500">
          Uploading...
        </h2>
      )}
      <div className="max-w-md mx-auto ">
        <div className="flex gap-4 items-center">
          <div className="">
            <div className=" rounded-lg p-2 max-w-[120px]">
              <div className="relative ">
                {image && (
                  <Image
                  className="rounded-lg h-full w-full"
                  width={250}
                  height={250}
                  src={image}
                  alt="avatar"
                ></Image>
                )}
                
              </div>
              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="border border-gray-300 cursor-pointer rounded-lg block p-2 px-8 text-center mt-4">
                  Edit
                </span>
              </label>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileUpdate}>
            <input
              type="text"
              placeholder="First and last name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              value={session.data?.user.email}
              disabled={true}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
