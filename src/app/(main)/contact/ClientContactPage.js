"use client";

import { useState } from "react";
import { TextInput } from "@/components/input";
import Button from "@/components/Button";
import fetchHorseted from "@/utils/fetchHorseted";
import { useAuthContext } from "@/context/AuthContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import Checkbox from "@/components/input/Checkbox";
import horsetedApp from "@/assets/images/horsetedApp.png";

export default function Contact() {
  const { accessToken, user } = useAuthContext();
  const [contactData, setContactData] = useState({
    object: "",
    email: "",
    message: "",
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setContactData((prev) => ({
      ...prev,
      acceptTerms: e.target.checked,
    }));
  };

  async function postContact() {
    let data = {
      object: contactData.object,
      message: contactData.message
    };

    const email = contactData.email.trim();
    if (email.length) {
      data = { ...data, email };
    }    

    const response = await fetchHorseted(
      `/contact`,
      accessToken,
      "POST",
      data,
      true,
      true
    );

    alert("Votre message a bien été envoyé");
  }

  const breadcrumbs = [{ label: "Accueil", href: "/" }, { label: "Contact" }];

  return (
    <div>
      <div className="bg-dark-green">
        <div className="container mx-auto px-5 pb-5 lg:pb-11">
          <Breadcrumbs breadcrumbs={breadcrumbs} white />
          <h1 className="text-4xl font-mcqueen font-bold text-white">
            Contactez l'équipe Horseted
          </h1>
        </div>
      </div>

      <div className="container mx-auto py-11 px-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postContact();
          }}
          className="form-container grid grid-cols-1 lg:grid-cols-2 gap-3 mb-5"
        >
          <TextInput
            label="Objet"
            name="object"
            value={contactData.object}
            onChange={handleChange}
            required
            className="col-span-2 lg:col-span-1 lg:w-1/2"
            placeholder="Objet du message..."
          />
          { !user &&
            <TextInput
              label="E-mail"
              name="email"
              value={contactData.email}
              onChange={handleChange}
              required
              className="col-span-2 lg:col-span-1"
              placeholder="Email de réponse..."
            />
          }
          <TextInput
            type="textarea"
            label="Message"
            name="message"
            value={contactData.message}
            onChange={handleChange}
            required
            className="col-span-2 lg:col-span-1"
            placeholder="Votre message..."
          />
          <div className="flex items-center gap-3 p-5 h-fit col-span-2 lg:col-span-1">
            <Checkbox
              name="acceptTerms"
              checked={contactData.acceptTerms}
              onChange={handleCheckboxChange}
              required={true}
            />
            <p className="font-semibold text-sm">
              J’accepte les{" "}
              <Link className=" underline" href="/cgu">
                conditions générales d’utilisation
              </Link>
            </p>
          </div>
          <Button className="col-span-2 lg:col-span-1" type="submit">
            Envoyer
          </Button>
          <div className="hidden lg:flex lg:justify-end lg:col-start-2 lg:row-start-1 lg:row-span-4">
            <Image
              sizes="(min-width: 1024px) 920px, 50vw"
              src={horsetedApp}
              alt="App Horseted"
              width={920}
              height={500}
              className="h-auto"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
