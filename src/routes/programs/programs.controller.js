const {
  createNewProgram,
  deleteProgramByID,
  updateProgramByID,
} = require("../../models/programs/programs.model");

async function httpCreateNewProgram(req, res) {
  const program = req.body;

  if (!program.name || !program.exercises) {
    return res.status(400).json({
      error: "Required property missing",
    });
  }

  try {
    await createNewProgram(program);

    return res.status(201).json(program);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: "Couldn't create the program. Please try again.",
    });
  }
}

async function httpDeleteProgramByID(req, res) {
  const programID = req.params.id;

  try {
    await deleteProgramByID(programID);

    res.status(200).json({
      message: `Successly deleted the program with program ID ${programID}`,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      error: "Couldn't delete requested program",
    });
  }
}

async function httpUpdateProgram(req, res) {
  const programID = req.params.id;

  let program = req.body;

  program.programID = programID;

  console.log(`Recieved the Program in backend ! -> ${programID}`);

  if (!programID)
    return res.status(400).json({
      error: "No Program ID found !!",
    });

  try {
    await updateProgramByID(program);

    res.status(200).json(program);
  } catch (err) {
    console.log(err);

    res.status(400).json({
      error: "Couldn't update the program",
    });
  }
}

module.exports = {
  httpCreateNewProgram,
  httpDeleteProgramByID,
  httpUpdateProgram,
};
