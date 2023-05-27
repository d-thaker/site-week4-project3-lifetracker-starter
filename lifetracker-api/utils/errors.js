class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

//400
class BadRequestError extends ExpressError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

//401
class UnauthorizedError extends ExpressError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

//403
class ForbiddenError extends ExpressError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

//404
class NotFoundError extends ExpressError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

//422
class UnprocessableEntityError extends ExpressError {
  constructor(message = "Unprocessable Entity") {
    super(message, 422);
  }
}

module.exports = {
  ExpressError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  UnprocessableEntityError,
};
