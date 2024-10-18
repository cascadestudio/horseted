import { NextResponse } from "next/server";

export function GET() {
  return new Response("Authentication Required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}
