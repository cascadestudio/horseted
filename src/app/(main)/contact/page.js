"use client";

import { useState } from "react";
import { TextInput } from "@/components/input";
import Button from "@/components/Button";
import fetchHorseted from "@/utils/fetchHorseted";
import { useAuthContext } from "@/context/AuthContext";

export default function Contact() {
  const { accessToken } = useAuthContext();
  const [contactData, setContactData] = useState({
    object: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  async function postContact() {
    const response = await fetchHorseted(
      `/contact`,
      accessToken,
      "POST",
      contactData,
      true,
      true
    );
    console.log("response =>", response);
  }

  return (
    <div>
      <form
        action={postContact}
        className="form-container grid grid-cols-1 lg:grid-cols-2 gap-12 mb-5"
      >
        <TextInput
          label="Object"
          name="object"
          value={contactData.object}
          onChange={handleChange}
          required
          className="col-span-2 lg:col-span-1"
        />
        <TextInput
          type="textarea"
          label="Message"
          name="message"
          value={contactData.message}
          onChange={handleChange}
          required
          className="col-span-2 lg:col-span-1"
        />
        <Button type="submit">Envoyer</Button>
      </form>
    </div>
  );
}
