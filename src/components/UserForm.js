"use client";
import React, { useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import useProfile from "./UseProfile";

const UserForm = ({ user, onSave }) => {
  const { data: isLoggedUserAdmin } = useProfile();

  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setUserName(user?.name);
    setImage(user?.image);
    setPhone(user?.phone);
    setStreetAddress(user?.streetAddress);
    setZipCode(user?.zipCode);
    setCity(user?.city);
    setCountry(user?.country);
    setIsAdmin(user?.isAdmin);
  }, [user]);

  return (
    <div className="flex gap-4 ">
      <div className="">
        <div className=" rounded-lg p-2 max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(e) =>
          onSave(e, {
            name: userName,
            image,
            phone,
            streetAddress,
            zipCode,
            city,
            country,
            isAdmin
          })
        }
      >
        <label>
          First and last name
          <input
            type="text"
            placeholder="First and last name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          Email
          <input type="email" value={user?.email || ""} disabled={true} />
        </label>

        <label>
          Phone number
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label>
          Street address
          <input
            type="text"
            placeholder="Street address"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </label>
        <div className="grid grid-cols-2 gap-2 ">
          <label>
            City
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label>
            Zip code
            <input
              type="text"
              placeholder="Zip code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </label>
        </div>
        <label>
          Country
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        {isLoggedUserAdmin && (
          <label className="p-2 flex items-center gap-2 mb-2">
            <span className="">Admin</span>
            <input
              checked={isAdmin}
              onClick={(e) => setIsAdmin(e.target.checked)}
              type="checkbox"
              value={"1"}
            />
          </label>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserForm;
