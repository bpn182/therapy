import db from "@/app/db/db";
import { asyncHandler } from "@/middleware/asyncHandler";
import { Appointment } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const providerId = searchParams.get("providerId");
  const userId = searchParams.get("userId");

  let appointments: any = [];
  if (userId) {
    appointments = await db.appointment.findMany({
      where: { userId },
    });
  }

  let query: any = {};
  if (providerId) {
    query = { providerId };
  }

  if (appointments.length) {
    const serviceIds = appointments.map((a: Appointment) => a.serviceId);
    query.id = { in: serviceIds };
  }

  console.log("query===>", query);
  const services = await db.service.findMany({
    where: query,

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
