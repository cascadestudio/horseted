export default function FooterLink({ id, name, title }) {
  return (
    <li>
      <a
        href={`/articles?categoryId=${id}&categoryName=${encodeURIComponent(name)}`}
      >
        {title}
      </a>
    </li>
  );
}
