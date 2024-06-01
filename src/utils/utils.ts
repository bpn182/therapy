import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

export const joinClassNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

export const toPascalCase = (str: string = "") => {
  return str.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
    return g1.toUpperCase() + g2.toLowerCase();
  });
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export async function comparePassword(
  providedPassword: string,
  storedPassword: string
): Promise<boolean> {
  return bcrypt.compare(providedPassword, storedPassword);
}

export const generateTimes = () => {
  const times = [];
  for (let i = 10; i <= 17; i++) {
    times.push(`${i <= 12 ? i : i - 12}${i < 12 ? "AM" : "PM"}`);
  }
  return times;
};

export const signToken = async (payload: any) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);

  return jwt;
};

export const verifyToken = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
