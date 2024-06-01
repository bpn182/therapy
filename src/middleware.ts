import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/utils";
import db from "./app/db/db";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // If the path does not start with /api, skip the middleware
  if (!path.startsWith("/api")) {
    return NextResponse.next();
  }

  if (
    path === "/api/auth/signin" ||
    path === "/api/auth/signup" ||
    path === "/api/auth/insurance"
  ) {
    return NextResponse.next();
  }

  const accessToken = request.headers.get("Authorization")?.split(" ")[1];

  if (!accessToken) {
    return NextResponse.json(
      { message: "Invalid token in request" },
      { status: 401 }
    );
  }

  let decoded: any = {};
  if (accessToken) {
    try {
      decoded = await verifyToken(accessToken);
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  }

  return NextResponse.next();
}
