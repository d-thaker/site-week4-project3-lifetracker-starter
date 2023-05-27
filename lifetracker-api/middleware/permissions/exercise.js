const Exercise = require("../../models/exercise");
const { UnauthorizedError, ForbiddenError } = require("../../utils/errors");

const userIsExerciseOwner = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { exerciseId } = req.params;
    const exercise = await Exercise.fetchById(exerciseId);

    if (exercise.userId !== user.id) {
      throw new ForbiddenError(
        "User is not allowed to fetch other users' exercises."
      );
    }

    res.locals.exercise = exercise;

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  userIsExerciseOwner,
};
