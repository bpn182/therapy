import db from "@/app/db/db";
import { asyncHandler } from "@/middleware/asyncHandler";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";

export const GET = asyncHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role") as keyof typeof Role;

  const services = await db.user.findMany({
    where: role ? { role } : {},
  });

  return NextResponse.json({ data: services });
});
