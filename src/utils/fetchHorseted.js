export default async function fetchHorseted(
  query,
  accessToken,
  method = "GET",
  body = null,
  isJsonBody,
  isDebug,
  isThrowError
) {
  const apiKey = process.env.NEXT_PUBLIC_HORSETED_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL;

  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_HORSETED_API_KEY is not set");
  }

  const headers = {
    "API-Key": apiKey,
    ...(isJsonBody && { "Content-Type": "application/json" }),
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const url = `${baseUrl}${query}`;

  const options = {
    method,
    headers,
    ...(body && isJsonBody
      ? { body: JSON.stringify(body) }
      : body && { body: body }),
  };

  isDebug &&
    console.log("Fetching Horseted API with", "URL:", url, "Options:", options);

  const response = await fetch(url, options);

  // Check if the response has a JSON content type and if the body is not empty
  const contentType = response.headers.get("content-type");

  if (response.ok && contentType && contentType.includes("application/json")) {
    return await response.json();
  } else if (response.ok) {
    return await response.blob();
  } else {
    // Handle non-OK responses
    const errorResponse =
      contentType && contentType.includes("application/json")
        ? await response.json()
        : { message: response.statusText };

    console.log(
      `Failed to fetch ${query}: ${errorResponse.message || response.statusText}`
    );
    if (isThrowError) {
      throw new Error(
        `Failed to fetch ${query}: ${
          errorResponse.message || response.statusText
        }`
      );
    } else {
      return errorResponse.message || response.statusText;
    }
  }
}
