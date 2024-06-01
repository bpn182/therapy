import db from "@/app/db/db";
import { IParams } from "@/app/interfaces/index.interface";
import { asyncHandler } from "@/middleware/asyncHandler";
import { hashPassword } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(
  async (request: NextRequest, { params }: IParams) => {
    const { _id } = params;

    const user = await db.user.findUnique({
      where: { id: _id },
      include: {
        insurance: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: user });
  }
);

export const PUT = asyncHandler(
  async (request: NextRequest, { params }: IParams) => {
    const { _id } = params;
    const {
      firstName,
      lastName,
      password,
      contactNumber,
      address,
      insuranceId,
    } = await request.json();

    const data: any = {
      firstName,
      lastName,
      contactNumber,
      address,
    };

    if (insuranceId) {
      data.insurance = {
        connect: { id: insuranceId },
      };
    }

    if (password) {
      const hashedPassword = await hashPassword(password);
      data.password = hashedPassword;
    }

    const user = await db.user.update({
      where: { id: _id },
      data: data,
      include: {
        insurance: true,
      },
    });

    return NextResponse.json({ data: user });
  }
);
