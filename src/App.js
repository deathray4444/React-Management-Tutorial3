import React, { useState } from "react";
import Customer from "./components/Customer";

const App = () => {
  const customers = [
    {
      id: 1,
      image: "http://placeimg.com/64/64/1",
      name: "홍길동",
      birthday: "961222",
      gender: "남자",
      job: "대학생",
    },
    {
      id: 2,
      image: "http://placeimg.com/64/64/2",
      name: "문자두",
      birthday: "961222",
      gender: "여자",
      job: "대학생",
    },
    {
      id: 3,
      image: "http://placeimg.com/64/64/3",
      name: "문 용",
      birthday: "961222",
      gender: "남자",
      job: "프로게이머",
    },
  ];
  return (
    <div>
      {customers.map((c) => {
        return (
          <Customer
            key={c.id}
            id={c.id}
            image={c.image}
            name={c.name}
            birthday={c.birthday}
            gender={c.gender}
            job={c.job}
          />
        );
      })}
    </div>
  );
};

export default App;
