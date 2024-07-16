import { TextInput } from "@/components/input";

export default function User({ user }) {
  const { firstName, lastName } = user;
  const handleChange = () => {};
  return (
    <div className="g-block flex justify-between">
      <TextInput
        onChange={handleChange}
        label="Nom"
        placeholder="Nom"
        name="firstName"
        value={firstName}
      />
      <TextInput
        onChange={handleChange}
        label="Prénom"
        placeholder="Prénom"
        name="lastName"
        value={lastName}
      />
      <TextInput
        onChange={handleChange}
        label="(Société)"
        placeholder=""
        name="company"
        // value={company}
      />
    </div>
  );
}
