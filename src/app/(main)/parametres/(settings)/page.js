"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateEmail } from "firebase/auth";
import Image from "next/image";
import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import getImage from "@/utils/getImage";
import AvatarDisplay from "@/components/AvatarDisplay";
import { TextInput } from "@/components/input";
import ModifyIcon from "@/assets/icons/ModifyIcon";
import CityIcon from "@/assets/icons/CityIcon";
import { formatDate } from "@/utils/formatDate";
import GoogleIcon from "@/assets/icons/GoogleIcon.svg";
import AppleIcon from "@/assets/icons/AppleIcon";
import LogOutIcon from "@/assets/icons/LogOutIcon";
import useHandleSignout from "@/hooks/useHandleSignout";

export default function Settings() {
  const handleSignout = useHandleSignout();
  const { user, accessToken } = useAuthContext();
  const router = useRouter();
  const [formData, setFormData] = useState(initializeFormData(user));
  const [showCity, setShowCity] = useState(false);

  console.log("formData =>", formData);

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

  // useEffect(() => {
  //   if (formData.avatar) {
  //     fetchAvatar(formData.avatar.files.thumbnail200);
  //   }
  // }, [formData.avatar]);

  useEffect(() => {
    setFormData(initializeFormData(user));
  }, [user]);

  useEffect(() => {
    const formDataToSend = prepareFormData(formData);
    updateUserDetails(formDataToSend);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const media = await postMedia(file);
      if (media) {
        setFormData((prev) => ({ ...prev, avatar: media.id }));
      }
    }
  };

  async function postMedia(file) {
    const formdata = new FormData();
    formdata.append("media", file);
    const media = await fetchHorseted(
      `/medias`,
      accessToken,
      "POST",
      formdata,
      false,
      true
    );
    return media;
  }

  const handleDeleteAccount = async () => {
    await deleteUserAccount(user.auth.accessToken, router);
  };

  function prepareFormData(formData) {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    });
    return formDataToSend;
  }

  async function updateUserDetails(formDataToSend) {
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
      accessToken,
      "PATCH",
      formDataToSend
    );
  }

  async function deleteUserAccount(token, router) {
    await fetchHorseted(`/users/me`, token, "DELETE");
    router.push("/");
  }

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

  return (
    <section>
      <form className="form-container grid grid-cols-1 lg:grid-cols-2 gap-12 mb-5">
        <Button
          variant="transparent-red"
          onClick={handleSignout}
          className="mt-5 lg:mt-0 col-span-2 lg:col-start-2 lg:col-span-1 w-full lg:w-fit place-self-start lg:place-self-end"
        >
          <LogOutIcon className="mr-3" />
          Se déconnecter
        </Button>
        <div className="flex items-center mb-10 col-span-2 lg:col-span-1 ">
          <div className="relative w-fit mr-8">
            <AvatarDisplay avatar={formData.avatar} size={84} />
            <AvatarInput onChange={handleAvatarChange} />
          </div>
          <div className="self-end mb-3">
            <span className="mr-1 font-bold font-mcqueen text-[24px]">@</span>
            <span className="text-lg text-grey">{user?.username}*</span>
          </div>
        </div>
        <div className="flex flex-col col-span-2 lg:col-span-1">
          <div className="relative flex items-center border border-black rounded-md p-3">
            <CityIcon className="w-5 h-5 text-gray-500 mr-3" />
            <span className="flex-grow font-poppins font-medium">
              {formData.city || "Sélectionnez une ville"}
            </span>
            <label htmlFor="city" className="flex items-center cursor-pointer">
              <ModifyIcon className="w-9 h-9" />
            </label>
            <input
              onChange={handleChange}
              type="file"
              name="city"
              id="city"
              className="hidden"
            />
            <CityDataList />
          </div>
          <div className="flex items-center justify-end mt-3">
            <label htmlFor="publicCity">
              <span className="text-sm mr-2">
                Afficher publiquement la ville
              </span>
              <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  id="publicCity"
                  checked={showCity}
                  onChange={() => setShowCity(!showCity)}
                  className="absolute block w-4 h-4 rounded-full bg-grey border-none appearance-none cursor-pointer top-1 checked:right-1 right-5 checked:bg-light-green"
                />
                <div className="block overflow-hidden h-6 rounded-full bg-white cursor-pointer border border-grey"></div>
              </div>
            </label>
          </div>
        </div>
        <TextInput
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="col-span-2 lg:col-span-1"
        />
        <TextInput
          label="Prénom"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="col-span-2 lg:col-span-1"
        />
        <TextInput
          label="Nom"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="col-span-2 lg:col-span-1"
        />
        <TextInput
          label="Date de naissance"
          name="birthday"
          value={formData.birthday ? formatDate(formData.birthday) : ""}
          onChange={handleChange}
          type="text"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          required
          className="col-span-2 lg:col-span-1"
          placeholder="jj/mm/aaaa"
        />
        <TextInput
          label="Présentation"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          type="textarea"
          rows={5}
          className="col-span-2 resize-none overflow-hidden break-words whitespace-pre-wrap"
        />
      </form>
      <div className="flex flex-col lg:flex-row mb-16 gap-4">
        <a
          href="#"
          className="flex items-center border border-black lg:w-fit rounded-[50px] p-1 h-14 w-full"
        >
          <div className="bg-white rounded-full h-[41px] w-[41px] flex items-center justify-center mr-3 lg:h-[50px] lg:w-[50px]">
            <Image
              src={GoogleIcon}
              alt="Google Icon"
              className="h-5 w-5 lg:h-6 lg:w-6"
            />
          </div>
          <span className="font-semibold pl-3 pr-10 lg:pl-6">
            Dissocier un compte Google
          </span>
        </a>
        <a
          href="#"
          className="flex items-center border border-black w-full lg:w-fit rounded-[50px] p-1 h-14"
        >
          <div className="bg-white rounded-full h-[41px] w-[41px] flex items-center justify-center mr-3 lg:h-[50px] lg:w-[50px]">
            <AppleIcon className="h-5 w-5 lg:h-6 lg:w-6" />
          </div>
          <span className="font-semibold pl-3 pr-10 lg:pl-6">
            Associer un compte Apple
          </span>
        </a>
      </div>
      <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row items-start lg:justify-between">
        <button
          className="delete-button font-semibold text-[12px] text-red"
          onClick={handleDeleteAccount}
        >
          Supprimer mon compte et mes données
        </button>
        <p className="font-mcqueen text-[12px]">
          *Vous ne pouvez pas modifier votre identifiant.
        </p>
      </div>
    </section>
  );
}
