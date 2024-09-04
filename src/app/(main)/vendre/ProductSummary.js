import DisplayMedia from "../../../components/DisplayMedia";

export default function ProductSummary({ postResponse }) {
  const { title, brand, size, medias } = postResponse;

  return (
    <div>
      <h1>{title}</h1>
      <p>{brand}</p>
      <p>{size.value}</p>

      <DisplayMedia medias={medias} />
    </div>
  );
}
