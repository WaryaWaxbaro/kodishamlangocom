import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import ReviewStars from "./ReviewStars";
import { unixToDate } from "../utils";

export default function PropertyListItem({ listing, thumbnail }) {
  const router = useRouter();
  const { pathname } = router;
  if (!listing && !thumbnail) return null;
  return (
    <tr>
      <td className="py-3">
        <div className="d-flex align-items-center">
          <div className="me-3 me-lg-4">
            <div
              className="position-relative cover-img-img rounded-5 overflow-hidden"
              style={{ width: "130px", height: "100px" }}
            >
              <Image src={thumbnail} layout="fill" />
            </div>
          </div>
          <div className="min-width-350">
            <h2 className="fs-16 ls-6">{listing.title}</h2>
            <p className="fs-12 ls-6">
              {listing.street}, {listing.sub_city}, {listing.city}
            </p>
            <ReviewStars rating={4} count={6} />
          </div>
        </div>
      </td>
      <td className="py-3">{unixToDate(listing.createdAt.seconds)}</td>
      <td className="py-3">164</td>
      <td className="py-3">
        <Link href={`${pathname}/${listing.mId}`}>
          <a className="btn btn-primary text-warning bg-transparent border-0 p-0">
            <i className="bi bi-pencil-square"></i>
          </a>
        </Link>
      </td>
      <td className="py-3">
        <Link href={`${pathname}/${listing.mId}`}>
          <a className="btn btn-primary text-danger bg-transparent border-0 p-0">
            <i className="bi bi-trash3-fill"></i>
          </a>
        </Link>
      </td>
    </tr>
  );
}
