const express = require("express");
const router = express.Router();
const Goals = require("../models/goals");

//Create a goals
router.post("/goals", async (req, res) => {
  try {
    const { sleep, water, calories, user, step } = req.body;

    const goals = await Goals.create({
      sleep,
      water,
      calories,
      user,
      step,
    });

    res.send(goals);
    console.log(goals);
  } catch (error) {
    console.log(error);
  }
});

//Fetch all goals
router.get("/goals", async (req, res) => {
  try {
    const goals = await Goals.find({});

    res.send(goals);
    console.log(goals);
  } catch (error) {
    console.log(error);
  }
});

//Update a goals
router.put("/goals/:id", async (req, res) => {
  try {
    const { _id } = req.body;

    const updatedGoals = await Goals.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    res.send(updatedGoals);
    console.log(updatedGoals);
  } catch (error) {
    console.log(error);
  }
});

//Delete a goals
router.delete("/goals/:id", async (req, res) => {
  try {
    const deleteGoals = await Goals.findByIdAndDelete(req.params.id);

    res.send(deleteGoals);
    console.log(deleteGoals);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
