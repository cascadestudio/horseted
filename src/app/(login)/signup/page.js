"use client";

import signUp from "@/libs/firebase/auth/signup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import HorsetedLogoBlackHorizontal from "@/assets/logos/HorsetedLogoBlackHorizontal.svg";
import LeftArrow from "@/assets/icons/LeftArrow";
import GooglePlayIconWhite from "@/assets/icons/GooglePlayIconWhite";
import AppleIconWhite from "@/assets/icons/AppleIconWhite";
import TickIcon from "@/assets/icons/TickIcon";
import heroImage2 from "@/assets/images/heroImage2.jpg";
import Checkbox from "@/components/input/Checkbox";
import Spinner from "@/components/Spinner";
import { postUser } from "@/utils/postUser";
import ExternalProviderLoginButton from "@/components/ExternalProviderLoginButton";
import { TextInput } from "@/components/input";
import Alert from "@/components/Alert";
import Link from "next/link";

export default function signupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { result, error } = await signUp(email, password);

    if (error) {
      setIsLoading(false);
      console.error(error);
      return setAlert({
        type: "error",
        message: "Erreur lors de la création de votre compte",
      });
    }

    const firebaseUser = result.user;
    const accessToken = await firebaseUser.getIdToken();

    try {
      await postUser({
        firebaseToken: accessToken,
        username: username,
        newsletter: newsletter,
      });
    } catch (error) {
      try {
        await firebaseUser.delete();
      } catch (deleteError) {
        console.error("Error deleting firebaseUser:", deleteError);
      }
      setIsLoading(false);
      setAlert({
        type: "error",
        message: "Erreur durant la création du compte Horseted",
      });
      return console.error("Error posting user:", error);
    }

    setIsLoading(false);
    setAlert({
      type: "success",
      message: "Un e-mail de vérification a été envoyé à votre adresse.",
    });
    setTimeout(() => {
      return router.push("/");
    }, 5000);
  };

  return (
    <div className="bg-light-grey min-h-screen flex flex-col justify-between lg:flex lg:flex-row">
      <div className="lg:w-1/2">
        {isLoading ? (
          <Spinner isFullScreen />
        ) : (
          <>
            <div className="border-b border-black lg:border-none">
              <div className="container mx-auto px-5 py-4 h-[65px] flex items-center relative lg:px-[52px] lg:pt-14 lg:pb-0 lg:h-[100px]">
                <button
                  onClick={() => router.back()}
                  className="justify-self-start"
                  aria-label="Retour"
                >
                  <LeftArrow className="w-[18px] lg:w-7" />
                </button>
                <Image
                  src={HorsetedLogoBlackHorizontal}
                  alt="Logo Horseted"
                  className="absolute left-1/2 -translate-x-1/2 w-[148px] lg:w-52"
                />{" "}
              </div>
            </div>
            <div className="container mx-auto px-5 pt-5 pb-14 flex flex-col lg:max-w-[505px] lg:pb-10 lg:pt-[60px] xl:px-0">
              <h1 className="text-center font-mcqueen font-bold text-[22px] lg:text-[36px]">
                Créer un compte
              </h1>
              <form
                onSubmit={handleForm}
                className=" border-b border-black mb-6 pb-6"
              >
                <TextInput
                  label="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  placeholder="exemple@mail.com"
                  className="mb-[18px] lg:mb-0"
                />
                <TextInput
                  label="Mot de passe"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Mot de passe"
                  minLength="6"
                  required
                />
                <label htmlFor="username">
                  <p className="mt-[18px] font-mcqueen font-semibold">
                    Nom d'utilisateur :
                  </p>
                  <div className="flex items-center border-b border-black">
                    <span className="text-black font-mcqueen font-semibold mr-2 pb-1">
                      @
                    </span>
                    <input
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      type="text"
                      name="username"
                      id="username"
                      placeholder="sophiemarceau"
                      className="border-none pl-1"
                    />
                  </div>
                </label>
                <div className="mt-4">
                  <label className="flex items-start mt-3">
                    <Checkbox
                      checked={newsletter}
                      onChange={() => setNewsletter(!newsletter)}
                    />
                    <span className="ml-2 text-[12px] leading-[18px] font-normal xl:whitespace-nowrap">
                      Je souhaite recevoir par e-mail des offres personnalisées
                      et les dernières mises à jour.
                    </span>
                  </label>
                  <label className="flex items-start mt-3">
                    <div className="w-4 h-4 lg:w-5 lg:h-5 relative">
                      <input
                        type="checkbox"
                        size="10"
                        required
                        className="appearance-none peer cursor-pointer w-4 h-4 lg:w-5 lg:h-5 border border-black rounded bg-white checked:bg-light-green checked:border-transparent"
                      />
                      <TickIcon
                        width={10}
                        height={7}
                        className="absolute w-auto inset-0 mx-auto mt-[6px] cursor-pointer peer-checked:visible invisible"
                      />
                    </div>
                    <span className="ml-2 text-[12px] leading-[18px] font-normal xl:whitespace-nowrap">
                      J’accepte les{" "}
                      <Link href="/cgu" className="underline">
                        conditions d’utilisation
                      </Link>
                      , j’ai lu la{" "}
                      <Link
                        href="/politique-de-confidentialite"
                        className="underline"
                      >
                        politique de confidentialité
                      </Link>{" "}
                      et j’ai + de 18 ans.
                    </span>
                  </label>
                </div>
                <Button
                  className="mt-[30px] w-full h-[52px] text-xl lg:mt-6"
                  type="submit"
                >
                  Créer un compte
                </Button>
              </form>
              <ExternalProviderLoginButton
                providerName="google"
                type="signup"
              />
              <ExternalProviderLoginButton providerName="apple" type="signup" />
              <h2 className="font-mcqueen font-bold text-[22px] leading-[32px] text-center mt-5 lg:mt-0 lg:text-[28px] lg:leading-[48px]">
                Se connecter
              </h2>
              <p className="text-center mb-3 lg:text-[18px]">
                Vous avez déjà un compte ?
              </p>
              <Button
                href="/signin"
                variant="transparent-green"
                className="w-full text-xl h-[52px] lg:w-[335px] lg:self-center"
              >
                Se connecter
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="bg-light-green text-white flex flex-col items-center lg:w-1/2">
        <Image
          src={heroImage2}
          alt="Accessoires d'équitation"
          className="hidden lg:block w-full h-[71vh] object-cover"
          priority
          sizes="50vw"
        />
        <h2 className="hidden lg:block font-mcqueen font-bold text-3xl leading-[32px] mt-14 mb-6 text-center">
          Articles d’équitation <br /> de seconde main
        </h2>
        <div className="flex justify-center gap-2">
          <a
            href="https://play.google.com/store/apps/details?id=com.citronnoir.horseted"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center border border-white px-[19px] py-[11px] rounded-xl my-8 lg:my-0 lg:pl-7 lg:mb-12"
            aria-label="Google Play"
          >
            <GooglePlayIconWhite className="w-8 h-8 mr-[14px]" />
            <div>
              <p className="text-[12px] leading-[14px] font-mcqueen lg:text-sm ">
                Télécharger sur
              </p>
              <p className="leading-[18px] font-mcqueen font-semibold lg:text-[20px]">
                Play Store
              </p>
            </div>
          </a>
          <a
            href="https://apps.apple.com/fr/app/horseted-mat%C3%A9riel-%C3%A9quitation/id6670403795"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center border border-white px-[19px] py-[11px] my-8 rounded-xl lg:my-0 lg:pl-7 lg:mb-12"
            aria-label="App Store"
          >
            <AppleIconWhite className="w-auto h-8 mr-[14px]" />
            <div>
              <p className="text-[12px] leading-[14px] font-mcqueen lg:text-sm ">
                Télécharger sur
              </p>
              <p className="leading-[18px] font-mcqueen font-semibold lg:text-[20px]">
                App Store
              </p>
            </div>
          </a>
        </div>
      </div>
      {alert && (
        <Alert setAlert={setAlert} type={alert.type}>
          {alert.message}
        </Alert>
      )}
    </div>
  );
}
