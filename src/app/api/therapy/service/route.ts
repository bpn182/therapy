import db from "@/app/db/db";
import { asyncHandler } from "@/middleware/asyncHandler";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const providerId = searchParams.get("providerId");

  const services = await db.service.findMany({
    where: providerId ? { providerId } : {},

    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      providerId: true,
    },
  });

  return NextResponse.json({ data: services });
});

export const POST = asyncHandler(async (request: NextRequest) => {
  const { name, description, price, providerId } = await request.json();
  console.log("adding service", providerId);
  const newService = await db.service.create({
    data: {
      name,
      description,
      price,
      providerId,
    },
  });

  return NextResponse.json({ data: newService });
});
