import db from "@/app/db/db";
import { asyncHandler } from "@/middleware/asyncHandler";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const providerId = searchParams.get("providerId");

  const insurance = await db.insurance.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
  });

  return NextResponse.json({ data: insurance });
});

export const POST = asyncHandler(async (request: NextRequest) => {
  const { name, description } = await request.json();

  const newInsurance = await db.insurance.create({
    data: {
      name,
      description,
    },
  });

  return NextResponse.json({ data: newInsurance });
});
