import * as Sentry from "@sentry/node";

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack || err.message);

  // Capture error in Sentry
  Sentry.captureException(err);

  // Determine error status and message
  let status = err.statusCode || 500; // Default to 500 (Internal Server Error)
  let message = err.message || "Internal Server Error";

  // Custom error handling
  if (err.name === "NotFoundError") {
    status = 404;
    message = err.message || "Resource not found";
  } else if (err.name === "UnauthorizedError") {
    status = 401;
    message = err.message || "Unauthorized";
  } else if (err.name === "ValidationError") {
    status = 400;
    message = err.message || "Validation failed";
  } else if (err.code === "P2002") {
    // Prisma unique constraint violation
    status = 400;
    message = "Username or email already exists.";
  } else if (err.code === "P2003") {
    // Prisma foreign key constraint violation
    status = 400;
    message = "Foreign key constraint violation: Invalid reference.";
  } else if (err.code === "P2025") {
    // Prisma record not found
    status = 404;
    message = "Record not found.";
  }

  // Log error to the console
  console.error(`[${status}] ${message}`);

  // Send error response
  res.status(status).json({
    error: {
      message,
    },
  });
};

export default errorHandler;
