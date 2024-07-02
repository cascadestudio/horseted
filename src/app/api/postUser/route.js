export async function POST(req) {
  const { firebaseToken, username, newsLetter } = await req.json();
  const res = await fetchHorseted(
    `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
        Authorization: `Bearer ${firebaseToken}`,
      },
      body: JSON.stringify({
        username: username,
        newsLetter: newsLetter,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });

  return Response.json(res);
}
