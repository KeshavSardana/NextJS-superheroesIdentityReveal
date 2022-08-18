// 8

const axios = require("axios").default;
import Link from "next/link";
import useRouter from "next/router";
import Router from "next/router";

import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";

const addNewHero = () => {
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    superHero: "",
    realName: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios("http://localhost:3000/api/heroes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(form),
      })
        .then(() => Router.push("/"))
        .catch((err) => {
          setError("Failed to Add in the database !");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="container text-center my-4">Add New SuperHero Identity</h1>
      <div className="row justify-content-md-center my-5">
        <form className="col-md-6 " onSubmit={handleSubmit}>
          <MDBInput
            onChange={handleChange}
            type="text"
            label="superHero"
            required
            name="superHero"
            className="my-3 col-6"
          />
          <MDBInput
            onChange={handleChange}
            type="text"
            label="realName"
            required
            name="realName"
            className="my-3"
          />
          <MDBBtn type="submit">Add New Hero</MDBBtn>
        </form>
        {error && <h3 className="mt-5 text-center text-danger">{error}</h3>}
      </div>
    </div>
  );
};

export default addNewHero;
