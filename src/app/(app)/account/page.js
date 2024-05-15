"use client";

import { getMe } from "@/libs/fetch";
import { useAuthContext } from "@/context/AuthContext";

export default function AccountPage() {
  const { user } = useAuthContext();

  // const apiUser = getMe(user.accessToken);

  console.log(user.accessToken);

  return <div>AccountPage</div>;
}
