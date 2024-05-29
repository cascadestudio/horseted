"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const { user } = useAuthContext();

  const [me, setMe] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("user =>", user);
    fetch(`http://localhost:3000/api/getUser?accessToken=${user.accessToken}`)
      .then((res) => res.json())
      .then((data) => {
        setMe(data.data);
        setIsLoading(false);
      });
  }, []);

  return <div>username {me.username}</div>;
}
