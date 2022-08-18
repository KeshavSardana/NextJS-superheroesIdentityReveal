// 5

// as i already told you in next js file names are all about the routes themselves . names of files in next js is routing in itselg=f
//  so to get any parameter or id from the route itself via the name you put in [] brackets in name of the file in req.query

import dbConnect from "../../../db/dbconnect";

import Hero from "../../../models/Hero";

dbConnect();

// get a unique record , edit , delete the unique records via the id coming in the route by extracting it from req.query

export default async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const hero = await Hero.findById(id);
        if (!hero) {
          res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, hero: hero });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "PUT":
      try {
        const hero = await Hero.findByIdAndUpdate(id, req.body, {
          new: true, // this will give us back the hero the new record that we sent now
          runValidators: true,
        });
        if (!hero) {
          res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, hero: hero });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "DELETE":
      try {
        const hero = await Hero.deleteOne({ _id: id });
        if (!hero) {
          res.status(400).json({ success: false, error: "dont know" });
        }
        res.status(200).json({ success: true, hero: hero });
      } catch (error) {
        res.status(400).json({ success: false, error: "dont know" });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
