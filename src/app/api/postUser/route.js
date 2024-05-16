export async function POST(req, res) {
  await fetch(`${process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.NEXT_PUBLIC_HORSETED_API_KEY,
      // Bearer: query,
    },
    // body: JSON.stringify(req.body),
  })
    .then((res) => res.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return Response.json(data);
}

// export async function POST(req, res) {
//   const data = await req.json();
//   console.log(data);

//   return Response.json(data);
// }
