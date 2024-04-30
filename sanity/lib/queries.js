import { groq } from "next-sanity";

export const ARTICLES_QUERY = groq`*[_type == "article"]`;
