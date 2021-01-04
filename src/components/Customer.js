import React from "react";

const Customer = ({ name, birthday, gender, job, id, image }) => {
  const CustomerProfile = () => {
    return (
      <div>
        <img src={image} alt="profile" />
        <h2>
          {name}
          {id}
        </h2>
      </div>
    );
  };
  const CustomerInfo = () => {
    return (
      <div>
        <p>{birthday}</p>
        <p>{gender}</p>
        <p>{job}</p>
      </div>
    );
  };

  return (
    <div>
      <CustomerProfile />
      <CustomerInfo />
    </div>
  );
};

export default Customer;
