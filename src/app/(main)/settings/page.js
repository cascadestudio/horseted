"use client";
import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";
import { fetchData } from "@/libs/fetch";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    avatar: user?.avatar || null,
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    description: user?.description || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        avatar: user?.avatar || null,
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        description: user?.description || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData((prev) => ({
        ...prev,
        avatar: files ? files[0] : null,
      }));
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    }

    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }

    const data = await fetchData(
      `/users/me`,
      user.accessToken,
      "PATCH",
      formDataToSend
    );
    console.log(data);
  };

  return (
    <section>
      <h1>Paramètres</h1>
      {user.username}
      <form
        onSubmit={handleSubmit}
        className="mt-3 border-b border-black mb-11 lg:border-t lg:pt-8 lg:border-b-0 lg:mb-[82px]"
      >
        <label htmlFor="avatar">
          <p className="mt-[18px] font-mcqueen font-semibold">Avatar :</p>
          <input
            onChange={handleChange}
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            className="bg-transparent border-b border-black w-full placeholder:font-normal placeholder:text-[14px] placeholder:text-grey pt-1 pb-2"
          />
        </label>
        <label htmlFor="email">
          <p className="mt-[18px] font-mcqueen font-semibold">Email :</p>
          <input
            value={formData.email}
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
            value={formData.firstName}
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
            value={formData.lastName}
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
            value={formData.description}
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
