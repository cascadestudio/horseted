// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    // Replace with your environment variables or hardcoded values
    const validUser = process.env.AUTH_USER;
    const validPassword = process.env.AUTH_PASSWORD;

    if (user === validUser && pwd === validPassword) {
      return NextResponse.next();
    }
  }

  const url = req.nextUrl;
  url.pathname = "/api/auth"; // Redirect to a custom authentication page
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/:path*", // Apply this middleware to all routes
};
