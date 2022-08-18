//  7th

const axios = require("axios").default;
import Link from "next/link";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";

const index = ({ heroes }) => {
  return (
    <div className="container">
      <h1 className="container text-center my-4">SuperHero Identity Manager</h1>

      <div className="container">
        <div className="row mt-5 justify-content-md-center">
          {heroes.map((hero) => {
            return (
              <MDBCard
                className="col-sm-5 col-md-4 m-3 border border-3"
                style={{ maxWidth: "22rem" }}
              >
                <MDBCardBody>
                  <MDBCardTitle>{hero.superHero}</MDBCardTitle>
                  <MDBCardText>
                    Reveal the Identity of {hero.superHero}
                  </MDBCardText>
                  <Link href={`/${hero._id}`}>
                    <MDBBtn className="m-1">View Hero</MDBBtn>
                  </Link>
                  <Link href={`/${hero._id}/edit`}>
                    <MDBBtn className="m-1">Edit Hero</MDBBtn>
                  </Link>
                </MDBCardBody>
              </MDBCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await axios("http://localhost:3000/api/heroes");
  console.log(res.data.heroes);
  const heroes = res.data.heroes;
  return {
    props: { heroes },
  };
}

export default index;
