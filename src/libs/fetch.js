// Fetch Data from Horsted API
export async function fetchData(
  query,
  accessToken = null,
  method = null,
  body = null
) {
  if (!process.env.NEXT_PUBLIC_HORSETED_API_KEY) {
    throw new Error("NEXT_PUBLIC_HORSETED_API_KEY is not set");
  }

  const headers = {
    "Content-Type": "application/json",
    "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
    ...(query.startsWith("/users") &&
      accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
  };

  const url = `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}${query}`;

  const options = {
    ...(method && { method: method }),
    headers: headers,
    ...(body && { body: JSON.stringify(body) }),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${query}`);
  }

  if (query.startsWith("/medias")) {
    const blob = await response.blob();
    const text = await blob.arrayBuffer();
    const base64 = Buffer.from(text).toString("base64");
    return base64;
  } else {
    return response.json();
  }
}

export async function patchData(query) {
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
