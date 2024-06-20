export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const accessToken = searchParams.get("accessToken");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/users/me`,
    {
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await res.json();
  return Response.json({ data });
}
