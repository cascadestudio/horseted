"use client";
import signUp from "@/libs/firebase/auth/signup";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function signupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  async function postUser(firebaseToken) {
    const response = await fetch(`http://localhost:3000/api/postUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firebaseToken: firebaseToken,
        username: username,
        newsLetter: false,
      }),
    });
    const data = await response.json();
  }

  const handleForm = async (event) => {
    event.preventDefault();
    const { result, error } = await signUp(email, password);
    if (error) {
      return console.log(error);
    } else {
      const firebaseToken = result.user.accessToken;
      await postUser(firebaseToken);
    }
    return router.push("/");
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Sign up</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <label htmlFor="username">
            <p>Nom d’utilisateur :</p>
            <input
              onChange={(e) => setUsername(e.target.value)}
              required
              type="text"
              name="username"
              id="username"
              placeholder="username"
            />
          </label>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}
