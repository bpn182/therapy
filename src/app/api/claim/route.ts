import db from "@/app/db/db";
import { asyncHandler } from "@/middleware/asyncHandler";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const therapyProviderId = searchParams.get("therapyProviderId");
  const userId = searchParams.get("userId");
  const insuranceId = searchParams.get("insuranceId");

  let whereClause: any = {};

  if (therapyProviderId) {
    whereClause.therapyProviderId = therapyProviderId;
  }

  if (userId) {
    whereClause.userId = userId;
  }
  if (insuranceId) {
    whereClause.insuranceId = insuranceId;
  }

  const claims = await db.claim.findMany({
    include: {
      user: true,
      service: true,
      insurance: true,
      therapyProvider: true,
    },
  });

  return NextResponse.json({ data: claims });
});

export const POST = asyncHandler(async (request: NextRequest) => {
  const { userId, insuranceId, therapyProviderId, serviceId, details, status } =
    await request.json();

  const newClaim = await db.claim.create({
    data: {
      userId,
      insuranceId,
      therapyProviderId,
      serviceId,
      details,
      status,
    },
  });

  return NextResponse.json({ data: newClaim });
});
