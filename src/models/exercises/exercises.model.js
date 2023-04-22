const exercisesDatabase = require("./exercises.mongo");

const DEFAULT_EXERCISE_ID = 0;

async function saveExercise(exercise) {
  await exercisesDatabase.findOneAndUpdate(
    {
      exerciseID: exercise.exerciseID,
    },
    exercise,
    {
      upsert: true,
    }
  );
}

async function getLatestExerciseID() {
  const latestExercise = await exercisesDatabase.findOne().sort("-exerciseID");

  if (!latestExercise) return DEFAULT_EXERCISE_ID;

  return latestExercise.exerciseID;
}

async function createNewExercise(exercise) {
  const exerciseID = (await getLatestExerciseID()) + 1;

  exercise = {
    ...exercise,
    exerciseID,
  };

  await saveExercise(exercise);
}

async function deleteExerciseByID(exerciseID) {
  const exercise = await exercisesDatabase.findOne({
    exerciseID: exerciseID,
  });

  if (!exercise) throw new Error("INCORRECT EXERCISE ID");

  await exercisesDatabase.deleteOne({
    exerciseID: exerciseID,
  });
}

async function findExerciseByname(exercise) {
  const exerciseExists = await exercisesDatabase.findOne({
    name: exercise,
  });

  return exerciseExists;
}

module.exports = {
  createNewExercise,
  deleteExerciseByID,
  findExerciseByname,
};
