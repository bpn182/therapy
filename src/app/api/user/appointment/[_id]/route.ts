import db from "@/app/db/db";
import { IParams } from "@/app/interfaces/index.interface";
import { asyncHandler } from "@/middleware/asyncHandler";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(
  async (request: NextRequest, { params }: IParams) => {
    const { _id } = params;
    const appointment = await db.appointment.findUnique({
      where: { id: _id },
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    return NextResponse.json({ data: appointment });
  }
);

export const PUT = asyncHandler(
  async (request: NextRequest, { params }: IParams) => {
    const { _id } = params;
    const body = await request.json();
    const appointment = await db.appointment.update({
      where: { id: _id },
      data: body,
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    return NextResponse.json({ data: appointment });
  }
);

export const DELETE = asyncHandler(
  async (request: NextRequest, { params }: IParams) => {
    const { _id } = params;
    const appointment = await db.appointment.delete({
      where: { id: _id },
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    return NextResponse.json({ data: appointment });
  }
);
