import nextConnect from "next-connect";
import cors from "cors";

import { verify } from "jsonwebtoken";

export default nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  },
})
  .use(cors())
  .use((req, res, next) => {
    req.userId = "guest";
    req.userName = "guest";
    const { authorization } = req.headers;

    if (!authorization) {
      next();
      console.log("no");
    } else {
      verify(
        authorization,
        process.env.NEXT_PUBLIC_SECRET_KEY,
        (error, decoded) => {
          if (!error && decoded) {
            req.userId = decoded.userId;
            req.userName = decoded.name;
          }
          next();
        }
      );
    }
  });
