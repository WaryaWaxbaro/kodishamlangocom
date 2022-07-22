import Link from "next/link";

export default function NavbarLinkItem({ link, isBtn, handleSignOut, name }) {
  return (
    <li className="cursor-pointer fs-14">
      {isBtn ? (
        <span onClick={handleSignOut} className="dropdown-item">
          {name}
        </span>
      ) : (
        <Link href={link.url}>
          <span className="dropdown-item">{name}</span>
        </Link>
      )}
    </li>
  );
}
