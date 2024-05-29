export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const accessToken = searchParams.get("accessToken");
  console.log("accessToken =>", accessToken);

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
  console.log("data =>", data);
  return Response.json({ data });
}
