"use client";
import React, { useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import useProfile from "./UseProfile";
import AddressInputs from "./AddressInputs";

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

  function handleAddressChange(propName, value){
    if(propName === 'phone') setPhone(value)
    if(propName === 'streetAddress') setStreetAddress(value)
    if(propName === 'zipCode') setZipCode(value)
    if(propName === 'city') setCity(value)
    if(propName === 'country') setCountry(value)
  }

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

        <AddressInputs addressProps={{streetAddress, phone, zipCode,city,country}} setAddressProps={handleAddressChange}/>
        
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
