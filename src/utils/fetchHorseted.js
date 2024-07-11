export default async function fetchHorseted(
  query,
  accessToken = null,
  method = "GET",
  body = null
) {
  const apiKey = process.env.NEXT_PUBLIC_HORSETED_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL;

  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_HORSETED_API_KEY is not set");
  }

  const headers = {
    "API-Key": apiKey,
    ...(method === "POST" &&
      query === "/users/me/payment_methods" && {
        "Content-Type": "application/json",
      }), //Problems with POST /threads cause formdata body
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const url = `${baseUrl}${query}`;

  const options = {
    method,
    headers,
    ...((body && method === "PATCH") ||
    (method === "POST" && body && query.startsWith("/threads"))
      ? { body: body }
      : body && {
          body: JSON.stringify(body),
          // body: JSON.stringify(body),
          // "Content-Type": "application/json",
        }),
  };

  // console.log("Fetching Horseted API with", "URL:", url, "Options:", options);

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        `Failed to fetch ${query}: ${
          errorResponse.message || response.statusText
        }`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching Horseted API:", error);
    throw error;
  }
}
