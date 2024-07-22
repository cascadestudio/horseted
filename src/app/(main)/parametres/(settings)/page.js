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
import ModifyIcon from "@/assets/icons/ModifyIcon";
import CityIcon from "@/assets/icons/CityIcon";

export default function Settings() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [formData, setFormData] = useState(initializeFormData(user));
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [isCityPublic, setIsCityPublic] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

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

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
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

  console.log(user?.username);

  return (
    <section>
      <form className="form-container grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* {user?.username} */}
        <div className="flex items-center mb-10">
          <div className="relative w-fit mr-8">
            <AvatarDisplay avatarSrc={avatarSrc} />
            <AvatarInput onChange={handleAvatarChange} />
          </div>
          <div className="self-end mb-3">
            <span className="mr-1 font-bold font-mcqueen text-[24px]">@</span>
            <span className="text-lg text-grey">username*</span>
          </div>
        </div>
        {/* <TextInput
          label="Ville"
          name="city"
          value={formData.city}
          onChange={handleChange}
          list="cities"
        /> */}
        <div className="flex flex-col">
          <div className="relative flex items-center border rounded-md p-3">
            <CityIcon className="w-5 h-5 text-gray-500 mr-3" />
            <span className="flex-grow">
              {formData.city || "Sélectionnez une ville"}
            </span>
            <label htmlFor="city" className="flex items-center cursor-pointer">
              <ModifyIcon className="w-9 h-9" />
            </label>
            {/* <input
              onChange={handleChange}
              type="file"
              name="city"
              id="city"
              className="hidden"
            /> */}
            <CityDataList />
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="publicCity"
              checked={isCityPublic}
              onChange={() => setIsCityPublic(!isCityPublic)}
              className="mr-2"
            />
            <label htmlFor="publicCity" className="text-gray-700">
              Afficher publiquement la ville
            </label>
          </div>
        </div>
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
      className="h-21 w-21 object-cover rounded-full"
      width={84}
      height={84}
      alt="Avatar"
    />
  ) : (
    <Image
      src={placeholderImage}
      className="h-21 w-21 object-cover rounded-full"
      width={84}
      height={84}
      alt="Avatar"
      priority
    />
  );

const AvatarInput = ({ onChange }) => (
  <label
    htmlFor="avatar"
    className="absolute top-0 right-0 flex items-center cursor-pointer"
  >
    <ModifyIcon className="w-9 h-9" />
    <input
      onChange={onChange}
      type="file"
      name="avatar"
      id="avatar"
      accept="image/*"
      className="hidden"
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
