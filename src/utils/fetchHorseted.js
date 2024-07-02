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
    // "Content-Type":
    //   method === "PATCH" ? "multipart/form-data" : "application/json",
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

  // console.log("url", url, "options", options);

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${query}`);
  }

  if (query.startsWith("/medias")) {
    const blob = await response.blob();

    if (accessToken !== null) {
      const imageObjectURL = URL.createObjectURL(blob);
      return imageObjectURL;
    } else {
      const text = await blob.arrayBuffer();
      const base64 = Buffer.from(text).toString("base64");
      return base64;
    }
  } else {
    return response.json();
  }
}
