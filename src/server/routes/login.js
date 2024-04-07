import express from "express";
import { MongoClient, ObjectId } from 'mongodb';
import fs from 'fs';
import { log } from 'console';
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();

let db;

router.post("/", async (req, res) => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  if (req.session.loggedin) {
      return res.sendStatus(400);
  }
  try {
      // Connect to the MongoDB cluster
      await client.connect();
      db = client.db("OrganizeMe");
  } catch (err) {
      console.error('An error occurred:', err);
  }
  console.log(req.body);

  let user = req.body.username;
  let pass = req.body.password;
  
  let userInfoCollection = db.collection("UserInfo");
  let userFound = await userInfoCollection.find({ username: user }).toArray();
  if (userFound.length != 0) {
    if (userFound[0].password == pass) {
      req.session.username = user; //we keep track of what user this session belongs to
      req.session.loggedin = true;

      if (userFound[0].patron === false) {
        return res.status(300).json({ user: user });
      }
      return res.status(200).json({ user: user });
    } else {
      return res.sendStatus(401);
    }
  } else {
      // Read JSON data from file
      let rawData = fs.readFileSync('./src/data/LMS_Data.json');
      let workData = JSON.parse(rawData);

      let userInput = {
        username : user,
        password : pass,
        work: {}
      }

      // Check if this is the first user in the database
      let firstUser = await userInfoCollection.find().sort({_id: 1}).limit(1).toArray();
      if (firstUser.length > 0 && firstUser[0].username == user || firstUser.length == 0&&userFound.length==0) {
        
        userInput.work = workData;
      }

      req.session.username = user; //we keep track of what user this session belongs to
      const result = await userInfoCollection.insertOne(userInput);
      return res.status(200).json({ user: user });
  }
});

// Export the router
export default router;