import db from "@/app/db/db";
import { IParams } from "@/app/interfaces/index.interface";
import { asyncHandler } from "@/middleware/asyncHandler";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(
  async (request: NextRequest, { params }: IParams) => {
    const { _id } = params;
    const claim = await db.claim.findUnique({
      where: { id: _id },
    });

    if (!claim) {
      throw new Error("claim not found");
    }

    return NextResponse.json({ data: claim });  
  }
);

export const PUT = asyncHandler(
  async (request: NextRequest, { params }: IParams) => {
    const { _id } = params;
    const body = await request.json();
    const claim = await db.claim.update({
      where: { id: _id },
      data: body,
    });

    if (!claim) {
      throw new Error("claim not found");
    }

    return NextResponse.json({ data: claim });
  }
);

export const DELETE = asyncHandler(
  async (request: NextRequest, { params }: IParams) => {
    const { _id } = params;
    const claim = await db.claim.delete({
      where: { id: _id },
    });

    if (!claim) {
      throw new Error("claim not found");
    }

    return NextResponse.json({ data: claim });
  }
);
