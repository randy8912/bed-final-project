import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import logger from "./utils/log.js";
import log from "./middlewares/logMiddleware.js";
import errorHandler from "./middlewares/errorHandler.js";
import * as Sentry from "@sentry/node";

// Import routes
import userRouter from "./routes/users.js";
import bookingRouter from "./routes/bookings.js";
import hostRouter from "./routes/hosts.js";
import propertyRouter from "./routes/properties.js";
import reviewRouter from "./routes/reviews.js";
import amenityRouter from "./routes/amenities.js";
import loginRouter from "./routes/auth.js";

// Load environment variables
dotenv.config();

const app = express();

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

// Middleware
app.use(bodyParser.json());
app.use(log);
app.use(Sentry.Handlers.requestHandler());

// Routes
app.use("/login", loginRouter);
app.use("/users", userRouter);
app.use("/bookings", bookingRouter);
app.use("/hosts", hostRouter);
app.use("/properties", propertyRouter);
app.use("/reviews", reviewRouter);
app.use("/amenities", amenityRouter);

app.get("/trigger-error", (req, res) => {
  throw new Error("This is a test error to verify Sentry integration.");
});

// Apply error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

export default app;
