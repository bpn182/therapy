import db from "@/app/db/db";
import { hashPassword } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
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
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const users = await db.user.findMany();

    return NextResponse.json({ data: users });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error retrieving users" },
      { status: 500 }
    );
  }
}
