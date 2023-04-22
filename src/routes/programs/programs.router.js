const express = require("express");
const {
  httpCreateNewProgram,
  httpDeleteProgramByID,
  httpUpdateProgram,
} = require("./programs.controller");

const programsRouter = express.Router();

programsRouter.post("/", httpCreateNewProgram);
programsRouter.delete("/:id", httpDeleteProgramByID);
// programsRouter.patch("/", httpUpdateProgram);
programsRouter.patch("/:id", httpUpdateProgram);

module.exports = programsRouter;
