import { TextInput } from "@/components/input";

export default function User() {
  //TODO: get user info

  const handleChange = () => {};
  return (
    <div className="g-block flex">
      <TextInput
        onChange={handleChange}
        label="Nom"
        placeholder="Nom"
        name="firstName"
      />
    </div>
  );
}
