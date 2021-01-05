import React from "react";

const CustomerDelete = (props) => {
  const deleteCustomer = (id) => {
    const url = "/api/customers/" + id;
    fetch(url, {
      method: "DELETE",
    }).then(props.stateReFresh());
  };

  return (
    <div>
      <button onClick={(e) => deleteCustomer(props.id)}>삭제</button>
    </div>
  );
};

export default CustomerDelete;
