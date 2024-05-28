import db from "@/app/db/db";
import { asyncHandler } from "@/middleware/asyncHandler";
import { hashPassword } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (request: NextRequest) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    email,
    password,
    contactNumber,
    address,
    role,
  } = await request.json();

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Prepare the user data
  const userData: any = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    contactNumber,
    address,
    role,
  };

  // Add dateOfBirth to userData only if it is provided
  if (dateOfBirth) {
    userData.dateOfBirth = new Date(dateOfBirth);
  }

  const existingUser = await db.user.findFirst({
    where: {
      email: userData.email,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 400 }
    );
  }

  const newUser = await db.user.create({
    data: userData,
  });

  return NextResponse.json({ data: newUser, message: "success" });
});

export const GET = asyncHandler(async (request: NextRequest) => {
  const users = await db.user.findMany();

  return NextResponse.json({ data: users });
});
