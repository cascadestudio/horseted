import signUp from "@/libs/firebase/auth/signup";
import { redirect } from "next/navigation";

export default function signupPage() {
  async function addUser(formData) {
    "use server";

    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const { email, password } = rawFormData;

    const { result, error } = await signUp(email, password);
    if (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Sign up</h1>
        <form
          action={async (formData) => {
            "use server";
            await addUser(formData);
            redirect("/");
          }}
          className="form"
        >
          <label htmlFor="email">
            <p>Email</p>
            <input
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
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          {/* <label htmlFor="username">
            <p>Nom d’utilisateur :</p>
            <input
              // onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label> */}
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}
