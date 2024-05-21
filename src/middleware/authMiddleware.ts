import jwt from "jsonwebtoken";

export const authMiddleware = (req: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Authorization header missing");
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET as string;

  if (!secret) {
    throw new Error("Invalid token");
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
  } catch (err) {
    throw new Error("Invalid token");
  }

  return req;
};
