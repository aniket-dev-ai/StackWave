import jwt from "jsonwebtoken";

export const Auth = async (req, res, next) => {
  const token =
    req.headers.authorization?.split(" ")[1] ||
    req.query.token ||
    req.params.token || 
    req.body.token; // Extracting token from different sources


  console.log("Extracted Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging ke liye
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(403).json({ message: "Forbidden", error: error.message });
  }
};

export const AuthAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.Role !== "Admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(403).json({ message: "Forbidden", error: error.message });
  }
}
