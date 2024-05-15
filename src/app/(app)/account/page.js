"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const { user } = useAuthContext();

  const [me, setMe] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/getUsers?query=${user.accessToken}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/getUser?query=${user.accessToken}`)
      .then((res) => res.json())
      .then((data) => {
        setMe(data.data);
        setIsLoading(false);
      });
  }, []);

  return <div>AccountPage</div>;
}
