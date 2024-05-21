import db from "@/app/db/db";
import { IParams } from "@/app/interfaces/index.interface";
import { asyncHandler } from "@/middleware/asyncHandler";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(
  async (request: NextRequest, { params }: IParams) => {
    const { _id } = params;
    const service = await db.service.findUnique({
      where: { id: _id },
    });

    if (!service) {
      throw new Error("Service not found");
    }

    return NextResponse.json({ data: service });
  }
);

export const PUT = asyncHandler(
  async (request: NextRequest, { params }: IParams) => {
    const { _id } = params;
    const body = await request.json();
    const service = await db.service.update({
      where: { id: _id },
      data: body,
    });

    if (!service) {
      throw new Error("Service not found");
    }

    return NextResponse.json({ data: service });
  }
);

export const DELETE = asyncHandler(
  async (request: NextRequest, { params }: IParams) => {
    const { _id } = params;
    const service = await db.service.delete({
      where: { id: _id },
    });

    if (!service) {
      throw new Error("Service not found");
    }

    return NextResponse.json({ data: service });
  }
);
