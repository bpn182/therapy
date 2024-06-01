import db from "@/app/db/db";
import { asyncHandler } from "@/middleware/asyncHandler";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const providerId = searchParams.get("providerId");

  let whereClause: any = {};

  if (providerId) {
    whereClause.providerId = providerId;
  }
  const services = await db.doctor.findMany({
    where: whereClause,
    select: {
      id: true,
      name: true,
      personalBio: true,
      specialization: true,
      phone: true,
      service: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return NextResponse.json({ data: services });
});

export const POST = asyncHandler(async (request: NextRequest) => {
  const { name, personalBio, specialization, serviceId, providerId, phone } =
    await request.json();

  const newService = await db.doctor.create({
    data: {
      name,
      personalBio,
      specialization,
      phone,
      service: {
        connect: {
          id: serviceId,
        },
      },
      provider: {
        connect: {
          id: providerId,
        },
      },
    },
  });

  return NextResponse.json({ data: newService });
});
