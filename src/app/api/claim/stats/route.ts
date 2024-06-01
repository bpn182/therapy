import db from "@/app/db/db";
import { asyncHandler } from "@/middleware/asyncHandler";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const insuraceId = searchParams.get("insuraceId");

  let whereClause: any = {};

  if (insuraceId) {
    whereClause.insuraceId = insuraceId;
  }

  const claims = await db.claim.findMany({
    where: whereClause,
  });

  let pendingClaimsCount = 0;
  let approvedClaimsCount = 0;
  let rejectedClaimsCount = 0;
  let requiresActionCount = 0;

  for (const claim of claims) {
    switch (claim.status) {
      case "PENDING":
        pendingClaimsCount++;
        break;
      case "APPROVED":
        approvedClaimsCount++;
        break;
      case "REJECTED":
        rejectedClaimsCount++;
        break;
      case "REQUIRES_ACTION":
        requiresActionCount++;
        break;
    }
  }

  const claimData = [
    {
      name: "Pending Claims",
      data: pendingClaimsCount,
    },
    {
      name: "Approved Claims",
      data: approvedClaimsCount,
    },
    {
      name: "Rejected Claims",
      data: rejectedClaimsCount,
    },
    {
      name: "Requires Action",
      data: requiresActionCount,
    },
  ];

  return NextResponse.json({ message: "success", data: claimData });
});
