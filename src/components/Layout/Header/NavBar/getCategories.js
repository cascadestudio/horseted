// export default async function getCategories(parentId) {
//   const res = await fetch(
//     `${process.env.HORSETED_API_BASE_URL}/categories?parentId=${parentId}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         "API-Key": process.env.HORSETED_API_KEY,
//       },
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

export default function getCategories(parentId) {
  let cat = [];
  fetch("http://localhost:3000/api")
    .then((res) => res.json())
    .then((data) => {
      cat = data;
    });
  return cat;
}
