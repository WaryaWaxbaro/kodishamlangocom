import Link from "next/link";
import Image from "next/image";

export default function Logo({ imgUrl }) {
  return (
    <Link href="/">
      <div className="navbar-logo-img">
        <Image src={imgUrl} height={30} width={150} layout="responsive" />
      </div>
    </Link>
  );
}
