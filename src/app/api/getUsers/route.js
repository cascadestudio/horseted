export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  const res = await fetchHorseted(
    `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/users?fromId=2794`,
    {
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
        Bearer: query,
      },
    }
  );
  const data = await res.json();
  return Response.json({ data });
}
