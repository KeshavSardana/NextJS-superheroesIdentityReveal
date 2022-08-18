// 3

// we could have done that before anything else ie connect to the database even before the page loads like we did in our mern project
// but in this lets use this that whenever you need to use it just import in that file only and connect to db in that page only
// This will improve the performance initially but the downside of doing this is that it will run ontop if you want to connect to
//   db for that page in which you need it

// if you want to connect db before even loading the pages then there is a hook in next named as getStaticProps you can use that in main file

// now one of the idea behing creating and putting it in a separate file is that whenever i need to connect with the database ,
//   i can import this file and can connect to the database in that particular file  only.

import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
