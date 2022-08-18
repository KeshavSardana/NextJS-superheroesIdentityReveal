// 8

const axios = require("axios").default;
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";

import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";

const EditHero = ({ hero }) => {
  const router = useRouter();
  const heroId = router.query.id;

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    superHero: hero.superHero,
    realName: hero.realName,
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
      const res = await axios(`http://localhost:3000/api/heroes/${heroId}`, {
        // we can use hero._id aswell instead of heroId
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(form),
      })
        .then(() => Router.push("/"))
        .catch((err) => {
          setError("Failed to update in the database !");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="container text-center my-4">
        Edit SuperHero {hero.superHero}
      </h1>
      <div className="row justify-content-md-center my-5">
        <form className="col-md-6 " onSubmit={handleSubmit}>
          <MDBInput
            onChange={handleChange}
            type="text"
            label="superHero"
            required
            name="superHero"
            className="my-3 col-6"
            value={form.superHero}
          />
          <MDBInput
            onChange={handleChange}
            type="text"
            label="realName"
            required
            name="realName"
            className="my-3"
            value={form.realName}
          />
          <MDBBtn type="submit">Edit Hero</MDBBtn>
        </form>
        {error && <h3 className="mt-5 text-center text-danger">{error}</h3>}
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  console.log(params);
  const id = params.id;
  const res = await axios(`http://localhost:3000/api/heroes/${id}`);
  console.log(res.data.hero);
  const hero = res.data.hero;
  return {
    props: { hero },
  };
}

export default EditHero;
