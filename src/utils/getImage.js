export default async function getImage(requestedImage, rendering, accessToken) {
  if (!process.env.NEXT_PUBLIC_HORSETED_API_KEY) {
    throw new Error("NEXT_PUBLIC_HORSETED_API_KEY is not set");
  }

  const headers = {
    "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
    ...(accessToken && {
      Authorization: `Bearer ${accessToken}`,
    }),
  };

  const url = `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/medias/${requestedImage}`;

  const options = {
    headers: headers,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${query}`);
  }

  const blob = await response.blob();

  if (rendering === "client") {
    const imageObjectURL = URL.createObjectURL(blob);
    return imageObjectURL;
  }
  if (rendering === "server") {
    const text = await blob.arrayBuffer();
    const base64 = Buffer.from(text).toString("base64");
    return base64;
  }
}
