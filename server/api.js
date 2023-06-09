/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");
const Plan = require("./models/plan.js");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  // console.log(`!!!${req.body.socketid}`);
  if (req.user) {
    // console.log(req.user);
    console.log(req.body.socketid);
    // if (typeof req.body.socketid === "undefined") {
    //   console.log("undefined!");
    // }
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  }
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.delete("/plan_delete", (req, res) => {
  Plan.deleteOne({ _id: req.body.data_id })
    .then(() => {
      console.log(`delete successfully with the id of ${req.body.data_id}`);
    })
    .catch((error) => {
      console.log(`error ${error}`);
    });
});
router.get("/plan", (req, res) => {
  Plan.find({ creator_id: req.user._id }).then((planlist) => {
    res.send(planlist);
  });
});
router.post("/plan", (req, res) => {
  const check_data_valid = (start_time, end_time) => {
    return true; /*待添加*/
  };
  if (!check_data_valid(req.body.start_time, req.body.end_time)) {
    res.send("The Time is invalid,Please Try again");
  } else {
    const Newplan = new Plan({
      creator_id: req.user._id,
      creator_name: req.user.name,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      plan_content: req.body.content,
    });
    Newplan.save().then((Newplan) => res.send(Newplan));
    socketManager.getSocketFromUserID(req.user._id).emit("plan", Newplan);
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
