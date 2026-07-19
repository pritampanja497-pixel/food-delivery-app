import jwt from "jsonwebtoken"

const authMiddleWare = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized, try again" })
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET)
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.json({ success: false, message: "Authentication Error: " + error.message })
  }

}



export default authMiddleWare;