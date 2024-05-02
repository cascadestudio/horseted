// Get API
export async function getApi(query) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/${query}`,
    {
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// Get Product Image
export async function getProductImage(query) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/${query}`,
    {
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const blob = await res.blob();
  const text = await blob.arrayBuffer();
  const base64 = Buffer.from(text).toString("base64");

  return base64;
}
