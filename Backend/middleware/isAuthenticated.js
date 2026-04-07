import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  try {
    // Check cookie first, then Authorization header
    let token = req.cookies.token;
    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") {
        token = parts[1];
      }
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }

    req.id = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};

export default authenticateToken;