import fetchHorseted from "./fetchHorseted";

export async function getUser(accessToken) {
  // try {
  const query = `/users/me`;
  const data = await fetchHorseted(query, accessToken);
  return data;
  // } catch (error) {
  //   console.error(`Error fetching user`, error);
  // }
}
