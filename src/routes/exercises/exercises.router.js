const express = require("express");
const {
  httpCreateNewExercise,
  httpDeleteExerciseByID,
} = require("./exercises.controller");

const exercisesRouter = express.Router();

exercisesRouter.post("/", httpCreateNewExercise);
exercisesRouter.delete("/:id", httpDeleteExerciseByID);

module.exports = exercisesRouter;
