import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const getPayload = async (request) => {
  const token = request.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (e) {
    return null;
  }
};

export async function proxy(request) {
  const pathname = request.nextUrl.pathname;
  const loginUrl = new URL("/login", request.url);
  const forbiddenUrl = new URL("/login", request.url);

  const payload = await getPayload(request);

  if (!payload) {
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin") && payload.role !== "admin") {
    return NextResponse.redirect(forbiddenUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
