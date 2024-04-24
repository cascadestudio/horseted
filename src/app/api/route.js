export async function GET() {
  const res = await fetch(`${process.env.HORSETED_API_BASE_URL}/categories`, {
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.HORSETED_API_KEY,
      body: {
        parentId: 1,
      },
    },
  });
  const data = await res.json();
  console.log(Response.json({ data }));
  return Response.json({ data });
}
