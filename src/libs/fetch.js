// Get API
// export async function getApi(query) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/${query}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
//       },
//     }
//   );
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

// Get Product Image
// export async function getProductImage(query) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/${query}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
//       },
//     }
//   );
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   const blob = await res.blob();
//   const text = await blob.arrayBuffer();
//   const base64 = Buffer.from(text).toString("base64");

//   return base64;
// }

// Get Categories
export async function getCategories(query) {
  const url = `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/categories?parentId=${query}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// Get User
// export async function getUsers(query) {
//   const url = `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/users?fromId=${query}`;
//   const res = await fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
//     },
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

// Get me
// export async function getMe(query) {
//   const url = `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/users/me`;
//   const res = await fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
//     },
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

// Fetch Data from Horsted API
export const fetchData = async (query, accessToken) => {
  const headers = {
    "Content-Type": "application/json",
    "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
    ...(query.startsWith("/users") && {
      Authorization: `Bearer ${accessToken}`,
    }),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}${query}`,
    {
      headers: headers,
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  if (query.startsWith("/medias")) {
    const blob = await response.blob();
    const text = await blob.arrayBuffer();
    const base64 = Buffer.from(text).toString("base64");
    return base64;
  } else {
    return response.json();
  }
};
