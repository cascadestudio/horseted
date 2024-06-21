"use client";
import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";
import { fetchData } from "@/libs/fetch";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { user } = useAuthContext();
  const [localUser, setLocalUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    description: user?.description || "",
  });

  useEffect(() => {
    if (user) {
      setLocalUser({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        description: user?.description || "",
      });
    }
  }, [user]);

  const handleForm = async (e) => {
    e.preventDefault();
    const data = await fetchData(
      `/users/${user.id}`,
      user.accessToken,
      "PATCH",
      localUser
    );
    console.log(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section>
      <h1>Paramètres</h1>
      {user.username}
      <form
        onSubmit={handleForm}
        className="mt-3 border-b border-black mb-11 lg:border-t lg:pt-8 lg:border-b-0 lg:mb-[82px]"
      >
        <label htmlFor="email">
          <p className="mt-[18px] font-mcqueen font-semibold">Email :</p>
          <input
            value={localUser.email}
            onChange={handleChange}
            required
            type="email"
            name="email"
            id="email"
            className="bg-transparent border-b border-black w-full placeholder:font-normal placeholder:text-[14px] placeholder:text-grey pt-1 pb-2"
          />
        </label>
        <label htmlFor="firstName">
          <p className="mt-[18px] font-mcqueen font-semibold">Prénom :</p>
          <input
            value={localUser.firstName}
            onChange={handleChange}
            required
            type="text"
            name="firstName"
            id="firstName"
            className="bg-transparent border-b border-black w-full placeholder:font-normal placeholder:text-[14px] placeholder:text-grey pt-1 pb-2"
          />
        </label>
        <label htmlFor="lastName">
          <p className="mt-[18px] font-mcqueen font-semibold">Nom :</p>
          <input
            value={localUser.lastName}
            onChange={handleChange}
            required
            type="text"
            name="lastName"
            id="lastName"
            className="bg-transparent border-b border-black w-full placeholder:font-normal placeholder:text-[14px] placeholder:text-grey pt-1 pb-2"
          />
        </label>
        <label htmlFor="description">
          <p className="mt-[18px] font-mcqueen font-semibold">Présentation :</p>
          <input
            value={localUser.description}
            onChange={handleChange}
            required
            type="text"
            name="description"
            id="description"
            className="bg-transparent border-b border-black w-full placeholder:font-normal placeholder:text-[14px] placeholder:text-grey pt-1 pb-2"
          />
        </label>
        <Button
          className="mt-[30px] w-full h-[52px] flex justify-center font-mcqueen font-semibold text-xl lg:mt-6"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </section>
  );
}
