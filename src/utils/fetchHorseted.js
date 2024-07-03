// Fetch Data from Horsted API
export default async function fetchHorseted(
  query,
  accessToken = null,
  method = null,
  body = null
) {
  if (!process.env.NEXT_PUBLIC_HORSETED_API_KEY) {
    throw new Error("NEXT_PUBLIC_HORSETED_API_KEY is not set");
  }

  const headers = {
    ...(method === "POST" && { "Content-Type": "application/json" }),
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
    ...(body && method === "PATCH"
      ? { body: body }
      : body && {
          body: JSON.stringify(body),
        }),
  };

  // console.log(
  //   "Try to fetch Horseted API with ",
  //   "url =>",
  //   url,
  //   "and options =>",
  //   options
  // );

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${query}`);
  }

  return response.json();
}
