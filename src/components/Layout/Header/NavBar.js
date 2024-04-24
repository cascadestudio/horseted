export default function NavBar({ className }) {
  return (
    <nav className={className + " flex py-4 border-t"}>
      <ul className="flex">
        <li className="font-raleway font-semibold mr-5">Cavaliers</li>
      </ul>
    </nav>
  );
}
