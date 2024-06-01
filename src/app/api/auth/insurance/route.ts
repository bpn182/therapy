import db from "@/app/db/db";
import { comparePassword, signToken } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Find the insurance with the provided email
    const insurance = await db.insurance.findFirst({
      where: {
        email,
      },
    });

    // If no insurance is found, return an error
    if (!insurance) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if the provided password matches the stored password
    const isPasswordValid = await comparePassword(password, insurance.password);

    // If the password is invalid, return an error
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // If the email and password are valid, return the insurance
    const secret = process.env.JWT_SECRET as string;

    if (!secret) {
      throw new Error("Invalid token");
    }

    const payload = { id: insurance.id, role: "INSURANCE" };
    const token = await signToken(payload);

    return NextResponse.json({
      data: insurance,
      accessToken: token,
      refreshToken: token,
      message: "success",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error logging in" }, { status: 500 });
  }
}
