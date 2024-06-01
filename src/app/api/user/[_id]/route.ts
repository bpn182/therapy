import db from "@/app/db/db";
import { IParams } from "@/app/interfaces/index.interface";
import { asyncHandler } from "@/middleware/asyncHandler";
import { hashPassword } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

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

    console.log("update data", data);

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
