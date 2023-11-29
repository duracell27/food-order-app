"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import toast from "react-hot-toast";
import EditableImage from '../../components/EditableImage'

import UserTabs from '../../components/UserTabs';

const ProfilePage = () => {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");

  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { status } = session;

  // const userImage = session.data?.user.image;
  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
      fetch("/api/profile", { method: "GET" }).then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setZipCode(data.zipCode);
          setCity(data.city);
          setCountry(data.country);
          setIsAdmin(data.isAdmin)
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

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    toast("Saving...");
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userName,
        image,
        streetAddress,
        phone,
        zipCode,
        city,
        country,
      }),
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
      <UserTabs isAdmin={isAdmin}/>
      

      <div className="max-w-md mx-auto ">
        <div className="flex gap-4 ">
          <div className="">
            <div className=" rounded-lg p-2 max-w-[120px]">
              <EditableImage link={image} setLink={setImage}/>
              {/* <div className="relative ">
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
              </label> */}
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileUpdate}>
            <label >
              First and last name
              <input
                type="text"
                placeholder="First and last name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            <label >
              Email
              <input
                type="email"
                value={session.data?.user.email}
                disabled={true}
              />
            </label>

            <label >
              Phone number
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <label >
              Street address
              <input
                type="text"
                placeholder="Street address"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
            </label>
            <div className="flex gap-2">
              <label >
                City
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </label>
              <label >
                Zip code
                <input
                  type="text"
                  placeholder="Zip code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </label>
            </div>
            <label >
              Country
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </label>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
