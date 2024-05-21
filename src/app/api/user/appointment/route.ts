import db from "@/app/db/db";
import { asyncHandler } from "@/middleware/asyncHandler";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const therapyProviderId = searchParams.get("providerId");
  const userId = searchParams.get("userId");

  let whereClause: any = {};

  if (therapyProviderId) {
    whereClause.therapyProviderId = therapyProviderId;
  }

  if (userId) {
    whereClause.userId = userId;
  }

  const services = await db.appointment.findMany({
    where: whereClause,

    select: {
      id: true,
      therapyProviderId: true,
      serviceId: true,
      userId: true,
      date: true,
      time: true,
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          contactNumber: true,
          email: true,
        },
      },
      service: {
        select: {
          name: true,
          description: true,
          price: true,
          providerId: true,
        },
      },
    },
  });

  return NextResponse.json({ data: services });
});

export const POST = asyncHandler(async (request: NextRequest) => {
  const { therapyProviderId, serviceId, userId, date, time } =
    await request.json();
  const newService = await db.appointment.create({
    data: {
      therapyProviderId,
      serviceId,
      userId,
      date,
      time,
    },
  });

  return NextResponse.json({ data: newService });
});
