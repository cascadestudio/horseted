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
    ...(method === "POST" && { "Content-Type": "application/json" }),
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const url = `${baseUrl}${query}`;

  const options = {
    method,
    headers,
    ...(body && method === "PATCH"
      ? { body: body }
      : body && {
          body: JSON.stringify(body),
        }),
  };

  console.log("Fetching Horseted API with", "URL:", url, "Options:", options);

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
