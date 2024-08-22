import ModifyIcon from "@/assets/icons/ModifyIcon";
import AvatarDisplay from "@/components/AvatarDisplay";
import Spinner from "@/components/Spinner";
import fetchHorseted from "@/utils/fetchHorseted";
import React, { useState } from "react";

export default function Avatar({ user, setFormData }) {
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true);
      const media = await postMedia(file);
      setIsLoading(false);
      setAvatar(media);
      setFormData((prev) => ({ ...prev, avatar: media.id }));
    }
  };

  async function postMedia(file) {
    const formdata = new FormData();
    formdata.append("media", file);
    const media = await fetchHorseted(
      `/medias`,
      user.auth.accessToken,
      "POST",
      formdata,
      false,
      true
    );
    return media;
  }

  return (
    <div className="relative w-fit mr-8">
      <AvatarDisplay
        avatar={avatar || user.avatar}
        size={84}
        isLoading={isLoading}
      />
      <label
        htmlFor="avatar"
        className="absolute top-[-5px] right-[-5px] flex items-center cursor-pointer"
      >
        <ModifyIcon className="w-9 h-9" />
        <input
          onChange={handleAvatarChange}
          type="file"
          name="avatar"
          id="avatar"
          accept="image/*"
          className="hidden"
        />
      </label>
    </div>
  );
}
