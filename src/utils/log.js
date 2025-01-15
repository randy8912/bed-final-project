import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: "logs/app.log" }), // Log to a file
  ],
});

// Log errors with detailed information
logger.error = (message, req) => {
  const logMessage = `[${req.method} ${req.originalUrl}] ${message}`;
  logger.log({ level: "error", message: logMessage });
};

export default logger;
