"use client";
import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";

export default function SettingsPage() {
  const { user } = useAuthContext();
  const [localUser, setLocalUser] = useState({
    username: user.username,
    email: user.email,
    description: user.description,
  });

  async function patchUser() {
    await fetch(`http://localhost:3000/api/patchUser`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firebaseToken: accessToken,
        user: currentMe,
      }),
    });
  }

  const handleForm = async (event) => {
    event.preventDefault();
    await patchUser();
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
      <form
        onSubmit={handleForm}
        className="mt-3 border-b border-black mb-11 lg:border-t lg:pt-8 lg:border-b-0 lg:mb-[82px]"
      >
        <label htmlFor="username">
          <input
            value={localUser.username}
            onChange={handleChange}
            required
            type="text"
            name="username"
            id="username"
            className="bg-transparent border-b border-black w-full placeholder:font-normal placeholder:text-[14px] placeholder:text-grey pt-1 pb-2"
          />
        </label>
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
