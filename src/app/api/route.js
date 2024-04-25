export async function GET() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/categories?parentId=`,
    {
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
      },
    }
  );
  const data = await res.json();
  // console.log(Response.json({ data }));
  return Response.json({ data });
}
