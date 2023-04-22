const { createNewExercise, deleteExerciseByID } = require("../../models/exercises/exercises.model");

async function httpCreateNewExercise (req, res) {

    const exercise = req.body;

    if( !exercise.name || !exercise.length ){
        return res.status(400).json({
            error: "Required property missing"
        });
    }

    try{

        await createNewExercise(exercise);

        res.status(201).json(exercise);

    } catch(err) {

        console.log(err);

        res.status(201).json({
            error: "Couldn't create the exercise. Please try again"
        });

    }

}

async function httpDeleteExerciseByID (req, res) {

    const exerciseID = req.params.id;

    try {

        await deleteExerciseByID(exerciseID);

        res.status(200).json({
            message: "Successly Deleted"
        });

    } catch (err) {

        console.log("THE ERROR IS : ", err);

        res.status(400).json({
            error: "Couldn't Delete the requested Exercise ID"
        });

    }

}

module.exports = {
    httpCreateNewExercise,
    httpDeleteExerciseByID,
}