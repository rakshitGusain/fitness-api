const programsDatabase = require("./programs.mongo");
const { findExerciseByname } = require("../exercises/exercises.model");

const DEFAULT_PROGRAM_ID = 0;

async function saveProgram(program) {
  await programsDatabase.findOneAndUpdate(
    {
      programID: program.programID,
    },
    program,
    {
      upsert: true,
    }
  );
}

async function getLatestProgramID() {
  const latestProgram = await programsDatabase.findOne().sort("-programID");

  if (!latestProgram) return DEFAULT_PROGRAM_ID;

  return latestProgram.programID;
}

async function findProgramByID(programID) {
  const program = await programsDatabase.findOne({
    programID: programID,
  });

  return program;
}

async function validateExercises(exercises) {
  for (exercise of exercises) {
    exerciseExists = await findExerciseByname(exercise);

    if (!exerciseExists)
      throw new Error(
        `No matching exercise/exercises with name ${exercise} was found`
      );
  }
}

async function createNewProgram(program) {
  validateExercises(program.exercises);

  const programID = (await getLatestProgramID()) + 1;

  program = {
    ...program,
    programID,
  };

  await saveProgram(program);
}

async function deleteProgramByID(programID) {
  const program = await findProgramByID(programID);

  if (!program) throw new Error("No Matching program found");

  await programsDatabase.deleteOne({
    programID: programID,
  });
}

async function updateProgramByID(program) {
  let oldProgram = await programsDatabase.findOne({
    programID: program.programID,
  });

  if (!oldProgram) throw new Error("No Matching Program Found");

  if (program.exercises) validateExercises(program.exercises);

  for (prop in program) {
    oldProgram[prop] = program[prop];
  }

  console.log(oldProgram.programID);
  console.log(oldProgram.name);
  console.log(oldProgram.exercises);

  await saveProgram(oldProgram);
}

module.exports = {
  createNewProgram,
  deleteProgramByID,
  updateProgramByID,
};
