//9

const axios = require("axios").default;
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";
import { useState } from "react";

// to delete the hero you need to access the id from the path once again so lets use useRouter this time to access id from the route.
// for the function getserversideprops we used params and then params.id to get id directly .
// use useRouter().query.id to get the id from the url itself otherwise if you have noticed that in this page we already have hero so get id from there aswell.
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";

const viewHero = ({ hero }) => {
  const router = useRouter();
  const heroId = router.query.id;
  console.log("Id of this hero is : ", heroId);

  const [error, setError] = useState("");

  const deleteHero = async () => {
    // console.log("hello");
    try {
      const deleteHero = await axios(
        `http://localhost:3000/api/heroes/${heroId}`,
        {
          method: "DELETE",
        }
      )
        .then(() => {
          console.log(deleteHero);
          Router.push("/");
        })
        .catch((error) => {
          setError("Failed to Delete from the database !");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="container text-center my-4">
        Identity of {hero.superHero}
      </h1>
      <div className="row justify-content-md-center">
        <MDBCard
          className="col-sm-5 col-md-4 m-3 border border-3"
          style={{ maxWidth: "22rem" }}
        >
          <MDBCardBody>
            <MDBCardTitle>{hero.superHero}</MDBCardTitle>
            <MDBCardText>
              Real Name of {hero.superHero} is {hero.realName}
            </MDBCardText>
            <MDBBtn className="m-1 btn btn-danger " onClick={deleteHero}>
              Delete Hero
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
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

export default viewHero;
