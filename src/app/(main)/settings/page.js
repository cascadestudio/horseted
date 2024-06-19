"use client";
import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";

export default function SettingsPage() {
  const { me, user } = useAuthContext();
  const [currentMe, setCurrentMe] = useState({
    id: me.id,
    description: me.description,
    // lastName: me.lastName,
    // birthDate: me.birthDate,
    // description: me.description,
    // avatar: me.avatar,
  });

  async function patchUser() {
    await fetch(`http://localhost:3000/api/patchUser`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firebaseToken: user.accessToken,
        user: currentMe,
      }),
    });
  }

  const handleForm = async (event) => {
    event.preventDefault();
    await patchUser();
  };

  return (
    <section>
      <h1>Paramètres</h1>
      {me.username}
      <form
        onSubmit={handleForm}
        className="mt-3 border-b border-black mb-11 lg:border-t lg:pt-8 lg:border-b-0 lg:mb-[82px]"
      >
        <label htmlFor="email">
          <p className="mt-[18px] font-mcqueen font-semibold">Email :</p>
          <input
            value={user.email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            name="email"
            id="email"
            className="bg-transparent border-b border-black w-full placeholder:font-normal placeholder:text-[14px] placeholder:text-grey pt-1 pb-2"
          />
        </label>
        <label htmlFor="description">
          <p className="mt-[18px] font-mcqueen font-semibold">description :</p>
          <input
            value={user.description}
            onChange={(e) =>
              setCurrentMe({ ...currentMe, description: e.target.value })
            }
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
