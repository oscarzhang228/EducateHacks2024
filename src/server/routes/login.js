import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  if (req.session.loggedin) {
    return res.sendStatus(400);
  }

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
    return res.status(201).json({ user: user });
  }
});

// Export the router
export default router;
