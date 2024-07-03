"use client";
import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import getImage from "@/utils/getImage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateEmail } from "firebase/auth";

export default function Settings() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.auth.email || "",
    description: user?.description || "",
    avatar: user?.avatar || null,
    city: user?.city || "",
  });

  const [avatarSrc, setAvatarSrc] = useState("");

  const fetchAvatar = async () => {
    const avatar = await getImage(
      user.avatar.files.thumbnail200,
      "client",
      user.auth.accessToken
    );
    setAvatarSrc(avatar);
    setFormData((prev) => ({
      ...prev,
      avatar: avatar,
    }));
  };

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.auth.email || "",
        description: user?.description || "",
        avatar: user?.avatar || null,
        city: user?.city || "",
      });
    }
    if (user.avatar !== null) {
      fetchAvatar();
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

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formdata = new FormData();
      formdata.append("avatar", file);
      for (let [key, value] of formdata.entries()) {
        console.log(`${key}:`, value);
      }
      const response = await fetchHorseted(
        `/users/me`,
        user.auth.accessToken,
        "PATCH",
        formdata
      );
      if (response) {
        fetchAvatar();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
        if (key === "email" && formData[key] !== user?.auth.email) {
          try {
            await updateEmail(user.auth, formData[key]);
            console.log("Email updated successfully.");
          } catch (error) {
            console.log(`Failed to update email: ${error.message}`);
          }
        }
      }
    }

    // for (let [key, value] of formDataToSend.entries()) {
    //   console.log(`${key}:`, value);
    // }

    const data = await fetchHorseted(
      `/users/me`,
      user.auth.accessToken,
      "PATCH",
      formDataToSend
    );
    console.log(data);
  };

  async function handleDeleteAccount() {
    const data = await fetchHorseted(`/users/me`, user.accessToken, "DELETE");
    return router.push("/");
  }

  return (
    <section>
      {user?.username}
      <img
        src={avatarSrc}
        alt="Fetched from API"
        className="max-w-full h-auto"
      />
      <form
        onSubmit={handleSubmit}
        className="mt-3 border-b border-black mb-11 lg:border-t lg:pt-8 lg:border-b-0 lg:mb-[82px]"
      >
        <label htmlFor="avatar">
          <p className="mt-[18px] font-mcqueen font-semibold">Avatar :</p>
          <input
            onChange={handleAvatarChange}
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            className="bg-transparent border-b border-black w-full placeholder:font-normal placeholder:text-[14px] placeholder:text-grey pt-1 pb-2"
          />
        </label>
        <label htmlFor="city">
          <p className="mt-[18px] font-mcqueen font-semibold">Ville :</p>
          <input
            value={formData.city}
            onChange={handleChange}
            list="cities"
            name="city"
            id="city"
            className="bg-transparent border-b border-black w-full placeholder:font-normal placeholder:text-[14px] placeholder:text-grey pt-1 pb-2"
          />
          <datalist id="cities">
            <option value="Paris" />
            <option value="Lille" />
            <option value="Marseille" />
            <option value="Lyon" />
            <option value="Nantes" />
            <option value="Brest" />
            <option value="Toulouse" />
            <option value="Montpellier" />
            <option value="Nice" />
            <option value="Strasbourg" />
            <option value="Lille" />
          </datalist>
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
      <Button
        className="mt-[30px] w-full h-[52px] flex justify-center font-mcqueen font-semibold text-xl lg:mt-6"
        onClick={handleDeleteAccount}
      >
        Delete account
      </Button>
    </section>
  );
}
