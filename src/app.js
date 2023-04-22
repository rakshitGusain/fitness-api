const express = require("express");

const programsRouter = require("./routes/programs/programs.router");
const exercisesRouter = require("./routes/exercises/exercises.router");

const app = express();

app.use(express.json());

app.use("/programs", programsRouter);
app.use("/exercises", exercisesRouter);

module.exports = app;
