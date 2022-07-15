import Link from "next/link";

export default function NavbarLinkItem({ link, isBtn, handleSignOut }) {
  return (
    <li className="cursor-pointer">
      {isBtn ? (
        <span onClick={handleSignOut} className="dropdown-item">
          {link.name}
        </span>
      ) : (
        <Link href={link.url}>
          <span className="dropdown-item">{link.name}</span>
        </Link>
      )}
    </li>
  );
}
