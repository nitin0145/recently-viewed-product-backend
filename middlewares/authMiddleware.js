const admin = require("firebase-admin");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
