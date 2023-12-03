import React from "react";

const AddressInputs = ({ addressProps, setAddressProps }) => {
  const { phone, streetAddress, city, zipCode, country } = addressProps;
  return (
    <>
      <label>
        Phone number
        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setAddressProps('phone',e.target.value)}
        />
      </label>
      <label>
        Street address
        <input
          type="text"
          placeholder="Street address"
          value={streetAddress}
          onChange={(e) => setAddressProps('streetAddress',e.target.value)}
        />
      </label>
      <div className="grid grid-cols-2 gap-2 ">
        <label>
          City
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setAddressProps('city',e.target.value)}
          />
        </label>
        <label>
          Zip code
          <input
            type="text"
            placeholder="Zip code"
            value={zipCode}
            onChange={(e) => setAddressProps('zipCode',e.target.value)}
          />
        </label>
      </div>
      <label>
        Country
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setAddressProps('country',e.target.value)}
        />
      </label>
    </>
  );
};

export default AddressInputs;
