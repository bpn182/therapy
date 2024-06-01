import db from "@/app/db/db";
import { asyncHandler } from "@/middleware/asyncHandler";
import { hashPassword } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const providerId = searchParams.get("providerId");

  const insurance = await db.insurance.findMany();

  return NextResponse.json({ data: insurance });
});

export const POST = asyncHandler(async (request: NextRequest) => {
  const data = await request.json();

  const existingUser = await db.insurance.findFirst({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 400 }
    );
  }

  if (data.password) {
    const hashedPassword = await hashPassword(data.password);
    data.password = hashedPassword;
  }

  const newInsurance = await db.insurance.create({
    data: data,
  });

  return NextResponse.json({ data: newInsurance });
});
