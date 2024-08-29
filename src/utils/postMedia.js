import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";

export async function postMedia(file, accessToken) {
  const formdata = new FormData();
  formdata.append("media", file);
  const media = await fetchHorseted(
    `/medias`,
    accessToken,
    "POST",
    formdata,
    false,
    true
  );
  return media;
}
