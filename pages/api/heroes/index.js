// 4

import dbConnect from "../../../db/dbconnect";

import Hero from "../../../models/Hero";

dbConnect();

// get all records , post a new record acc to the req type

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const heroes = await Hero.find({});
        res.status(200).json({ success: true, heroes: heroes });
      } catch (err) {
        res.status(400).json({ success: false, error: err });
      }
      break;
    case "POST":
      try {
        // here you can sanitize your data that means you can put various validation on your data that is coming in before sending it to db.
        const hero = await Hero.create(req.body);
        res.status(200).json({ success: true, hero: hero });
      } catch (err) {
        res.status(400).json({ success: false, error: err });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
