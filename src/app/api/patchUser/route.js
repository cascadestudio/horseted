export async function PATCH(req) {
  const { firebaseToken, user } = await req.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/users/${user.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
        Authorization: `Bearer ${firebaseToken}`,
      },
      body: JSON.stringify({
        description: user.description,
        // lastName: user.lastName,
        // birthDate: user.birthDate,
        // description: user.description,
        // avatar: user.avatar,
      }),
    }
  );
  const data = await res.json();
  return Response.json({ data });
}
