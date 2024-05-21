import { IParams } from "@/app/interfaces/index.interface";
import { NextRequest, NextResponse } from "next/server";

export const asyncHandler = (fn: Function) => {
    return (req: NextRequest, params?: IParams) => {
      return fn(req, params).catch((err: Error) => {
        console.error(err);
        return NextResponse.json({ message: err.message }, { status: 500 });
      });
    };
  };