"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateEmail } from "firebase/auth";
import Image from "next/image";
import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { TextInput } from "@/components/input";
import ModifyIcon from "@/assets/icons/ModifyIcon";
import AppleIcon from "@/assets/icons/AppleIcon";
import LogOutIcon from "@/assets/icons/LogOutIcon";
import useHandleSignout from "@/hooks/useHandleSignout";
import Avatar from "./Avatar";
import { deleteFirebaseUser } from "@/libs/firebase/auth/deleteUser";
import SignInModal from "@/components/SignInModal";
import DeleteAccountButton from "./DeleteAccountButton";
import CityInput from "./CityInput";
import LinkAccount from "./LinkAccount";

export default function Settings() {
  const handleSignout = useHandleSignout();
  const { user, accessToken } = useAuthContext();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    birthDate: user?.birthDate || null,
    email: user?.auth.email || "",
    description: user?.description || "",
    city: user?.city || "",
    avatar: user?.avatar?.id || null,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {
      patchUser();
    } else {
      setIsMounted(true);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function patchUser() {
    const user = await fetchHorseted(
      `/users/me`,
      accessToken,
      "PATCH",
      formData,
      true
    );
    console.log("user =>", user);
  }

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    return isoDate.split("T")[0];
  };

  return (
    <section>
      <form className="form-container gap-5 grid grid-cols-1 lg:grid-cols-2 lg:gap-12 mb-5">
        <Button
          variant="transparent-red"
          onClick={handleSignout}
          className="mt-5 lg:mt-0 col-span-2 lg:col-start-2 lg:col-span-1 w-full lg:w-fit place-self-start lg:place-self-end"
        >
          <LogOutIcon className="mr-3" />
          Se déconnecter
        </Button>
        <div className="flex items-center mb-10 col-span-2 lg:col-span-1 ">
          <Avatar setFormData={setFormData} user={user} />
          <div className="self-end mb-3">
            <span className="mr-1 font-bold font-mcqueen text-[24px]">@</span>
            <span className="text-lg text-grey">{user.username}*</span>
          </div>
        </div>
        <div className="flex flex-col items-end col-span-2 lg:col-span-1">
          <CityInput />
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
          name="birthDate"
          value={formatDate(formData.birthDate)}
          onChange={handleChange}
          type="date"
          required
          className="col-span-2 lg:col-span-1"
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
      <div className="flex flex-col lg:flex-row mb-5 gap-4">
        <LinkAccount />
        {/* <a
          href="#"
          className="flex items-center border border-black w-full lg:w-fit rounded-[50px] p-1 h-14"
        >
          <div className="bg-white rounded-full h-[41px] w-[41px] flex items-center justify-center mr-3 lg:h-[50px] lg:w-[50px]">
            <AppleIcon className="h-6 w-6" />
          </div>
          <span className="font-semibold pl-3 pr-10 lg:pl-6">
            Associer un compte Apple
          </span>
        </a> */}
      </div>
      <Button className="w-full mb-16">Enregistrer</Button>
      <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row items-start lg:justify-between">
        <DeleteAccountButton accessToken={accessToken} />
        <p className="font-mcqueen text-[12px]">
          *Vous ne pouvez pas modifier votre identifiant.
        </p>
      </div>
    </section>
  );
}
