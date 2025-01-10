import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Extract the token, whether it is prefixed with "Bearer " or not
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7) // Remove "Bearer " prefix
    : authHeader; // Use the token as is if no "Bearer " prefix

  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }

  try {
    const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
    const decoded = jwt.verify(token, secretKey); // Verify the token
    req.user = decoded; // Attach the decoded payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token." });
  }
};

export default auth;
