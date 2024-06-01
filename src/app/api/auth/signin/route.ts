import db from "@/app/db/db";
import { comparePassword, signToken } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Find the user with the provided email
    const user = await db.user.findFirst({
      where: {
        email,
      },
      include: {
        insurance: true,
      },
    });

    // If no user is found, return an error
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if the provided password matches the stored password
    const isPasswordValid = await comparePassword(password, user.password);

    // If the password is invalid, return an error
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // If the email and password are valid, return the user
    const secret = process.env.JWT_SECRET as string;

    if (!secret) {
      throw new Error("Invalid token");
    }

    const payload = { id: user.id, role: user.role };
    const token = await signToken(payload);

    return NextResponse.json({
      data: user,
      accessToken: token,
      refreshToken: token,
      message: "success",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error logging in" }, { status: 500 });
  }
}
