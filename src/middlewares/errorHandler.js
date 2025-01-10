// src/middlewares/errorHandler.js
import * as Sentry from "@sentry/node";

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack || err.message);

  // Capture error in Sentry
  Sentry.captureException(err);

  // Determine error status and message
  let status = 500; // Default to 500 (Internal Server Error)
  let message = "Internal Server Error";

  if (err.name === "NotFoundError") {
    status = 404;
    message = err.message || "Resource not found";
  } else if (err.name === "UnauthorizedError") {
    status = 401;
    message = err.message || "Unauthorized";
  }

  // Send error response
  res.status(status).json({
    error: {
      message,
    },
  });
};

export default errorHandler;
