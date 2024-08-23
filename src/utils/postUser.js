import fetchHorseted from "./fetchHorseted";

export async function postUser({ firebaseToken, username, newsletter }) {
  const query = "/users";
  const body = {
    username: username,
    newsLetter: newsletter,
  };
  const postUser = await fetchHorseted(
    query,
    firebaseToken,
    "POST",
    body,
    true
  );
  console.log("postUser =>", postUser);
}
