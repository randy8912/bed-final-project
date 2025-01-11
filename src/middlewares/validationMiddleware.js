// src/middlewares/validationMiddleware.js
export const validateRequiredFields = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Bad Request",
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    next();
  };
};
