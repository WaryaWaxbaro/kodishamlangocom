import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import ReviewStars from "./ReviewStars";
import { unixToDate, getAverageRating } from "../utils";
import { ApartmentModel, ReviewsModel } from "../models/index";
import StorageUploads from "../models/storageUploads";

export default function PropertyListItem({ listing, thumbnail }) {
  const router = useRouter();
  const { pathname } = router;
  const [isDeleting, setIsDeleting] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      console.log(listing?.mId);
      const revs = await new ReviewsModel({
        propertyId: `${listing?.mId}`,
      }).getAllByQuery();
      console.log(revs);
      if (revs && revs.length > 0) {
        setReviews(revs);
      }
    };

    if (listing?.mId) {
      getReviews();
    }
  }, [listing]);

  const handleDelete = async () => {
    setIsDeleting(true);
    const deleteListing = await new ApartmentModel({
      id: listing.id,
    }).remove();
    const removeImages = await new StorageUploads(
      `/apartments/${listing.mId}`
    ).removeAllWithThumbnail();

    toast.success("Listing deleted successfully");
    router.reload();
  };

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
            <ReviewStars
              rating={getAverageRating(reviews)}
              count={reviews.length}
            />
          </div>
        </div>
      </td>
      <td className="py-3">{unixToDate(listing.createdAt.seconds)}</td>
      <td className="py-3">{listing.views ? listing.views : 0}</td>
      <td className="py-3">
        <Link href={`${pathname}/${listing.mId}`}>
          <a className="btn btn-primary text-warning bg-transparent border-0 p-0">
            <i className="bi bi-pencil-square"></i>
          </a>
        </Link>
      </td>
      <td className="py-3">
        <a
          onClick={handleDelete}
          className={
            isDeleting
              ? "btn btn-primary text-danger bg-transparent border-0 p-0 disabled"
              : "btn btn-primary text-danger bg-transparent border-0 p-0"
          }
        >
          <i className="bi bi-trash3-fill"></i>
        </a>
      </td>
    </tr>
  );
}
