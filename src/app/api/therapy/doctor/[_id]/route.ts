import db from "@/app/db/db";
import { IParams } from "@/app/interfaces/index.interface";
import { asyncHandler } from "@/middleware/asyncHandler";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(
  async (request: NextRequest, { params }: IParams) => {
    const { _id } = params;
    const doctor = await db.doctor.findUnique({
      where: { id: _id },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    return NextResponse.json({ data: doctor });
  }
);

export const PUT = asyncHandler(
  async (request: NextRequest, { params }: IParams) => {
    const { _id } = params;
    const body = await request.json();
    const doctor = await db.doctor.update({
      where: { id: _id },
      data: body,
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    return NextResponse.json({ data: doctor });
  }
);

export const DELETE = asyncHandler(
  async (request: NextRequest, { params }: IParams) => {
    const { _id } = params;
    const doctor = await db.doctor.delete({
      where: { id: _id },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    return NextResponse.json({ data: doctor });
  }
);
