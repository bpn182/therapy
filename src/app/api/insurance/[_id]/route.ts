import db from "@/app/db/db";
import { IParams } from "@/app/interfaces/index.interface";
import { asyncHandler } from "@/middleware/asyncHandler";
import { hashPassword } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(
  async (request: NextRequest, { params }: IParams) => {
    const { _id } = params;
    const claim = await db.insurance.findUnique({
      where: { id: _id },
    });

    if (!claim) {
      throw new Error("insurance not found");
    }

    return NextResponse.json({ data: claim });
  }
);

export const PUT = asyncHandler(
  async (request: NextRequest, { params }: IParams) => {
    const { _id } = params;
    const body = await request.json();
    console.log("body", body);

    if (body.password) {
      const hashedPassword = await hashPassword(body.password);
      body.password = hashedPassword;
    }

    const claim = await db.insurance.update({
      where: { id: _id },
      data: body,
    });

    if (!claim) {
      throw new Error("insurance not found");
    }

    return NextResponse.json({ data: claim });
  }
);

export const DELETE = asyncHandler(
  async (request: NextRequest, { params }: IParams) => {
    const { _id } = params;
    const claim = await db.insurance.delete({
      where: { id: _id },
    });

    if (!claim) {
      throw new Error("claim not found");
    }

    return NextResponse.json({ data: claim });
  }
);
