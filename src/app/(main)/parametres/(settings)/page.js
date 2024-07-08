"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateEmail } from "firebase/auth";
import Image from "next/image";
import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import getImage from "@/utils/getImage";
import placeholderImage from "@/assets/images/placeholder.svg";
import { TextInput } from "@/components/input";

export default function Settings() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [formData, setFormData] = useState(initializeFormData(user));
  const [avatarSrc, setAvatarSrc] = useState(null);

  useEffect(() => {
    if (formData.avatar) {
      fetchAvatar(
        formData.avatar.files.thumbnail200,
        user.auth.accessToken,
        setAvatarSrc
      );
    }
  }, [formData.avatar]);

  useEffect(() => {
    setFormData(initializeFormData(user));
  }, [user]);

  useEffect(() => {
    const formDataToSend = prepareFormData(formData);
    updateUserDetails(formDataToSend, user, router, setFormData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedAvatar = await updateAvatar(file, user.auth.accessToken);
      if (updatedAvatar) {
        setFormData((prev) => ({ ...prev, avatar: updatedAvatar }));
      }
    }
  };

  const handleDeleteAccount = async () => {
    await deleteUserAccount(user.auth.accessToken, router);
  };

  return (
    <section>
      {user?.username}
      <AvatarDisplay avatarSrc={avatarSrc} />
      <form className="form-container">
        <AvatarInput onChange={handleAvatarChange} />
        <TextInput
          label="Ville"
          name="city"
          value={formData.city}
          onChange={handleChange}
          list="cities"
        />
        <CityDataList />
        <TextInput
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Prénom"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Nom"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Présentation"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </form>
      <Button className="delete-button" onClick={handleDeleteAccount}>
        Delete account
      </Button>
    </section>
  );
}

function initializeFormData(user) {
  return {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.auth.email || "",
    description: user?.description || "",
    avatar: user?.avatar || null,
    city: user?.city || "",
  };
}

async function fetchAvatar(file, token, setAvatarSrc) {
  const avatarSrc = await getImage(file, "client", token);
  setAvatarSrc(avatarSrc);
}

async function updateAvatar(file, token) {
  const formdata = new FormData();
  formdata.append("avatar", file);
  const response = await fetchHorseted(`/users/me`, token, "PATCH", formdata);
  return response?.avatar;
}

function prepareFormData(formData) {
  const formDataToSend = new FormData();
  Object.keys(formData).forEach((key) => {
    if (formData[key] !== null) {
      formDataToSend.append(key, formData[key]);
    }
  });
  return formDataToSend;
}

async function updateUserDetails(formDataToSend, user) {
  if (formDataToSend.get("email") !== user?.auth.email) {
    try {
      await updateEmail(user.auth, formDataToSend.get("email"));
      console.log("Email updated successfully.");
    } catch (error) {
      console.log(`Failed to update email: ${error.message}`);
    }
  }
  const data = await fetchHorseted(
    `/users/me`,
    user.auth.accessToken,
    "PATCH",
    formDataToSend
  );
}

async function deleteUserAccount(token, router) {
  await fetchHorseted(`/users/me`, token, "DELETE");
  router.push("/");
}

const AvatarDisplay = ({ avatarSrc }) =>
  avatarSrc ? (
    <Image
      src={avatarSrc}
      className="w-auto h-40 rounded-full"
      width={200}
      height={200}
      alt="Avatar"
    />
  ) : (
    <Image
      src={placeholderImage}
      className="rounded-full"
      width={200}
      height={200}
      alt="Avatar"
      priority
    />
  );

const AvatarInput = ({ onChange }) => (
  <label htmlFor="avatar">
    <p className="label">Avatar :</p>
    <input
      onChange={onChange}
      type="file"
      name="avatar"
      id="avatar"
      accept="image/*"
      className="input"
    />
  </label>
);

const CityDataList = () => (
  <datalist id="cities">
    {[
      "Paris",
      "Lille",
      "Marseille",
      "Lyon",
      "Nantes",
      "Brest",
      "Toulouse",
      "Montpellier",
      "Nice",
      "Strasbourg",
    ].map((city) => (
      <option key={city} value={city} />
    ))}
  </datalist>
);
