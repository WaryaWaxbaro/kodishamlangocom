import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import ReviewStars from "./ReviewStars";
import { unixToDate, getAverageRating } from "../utils";
import {
  ApartmentModel,
  ReviewsModel,
  ContactRequestModel,
} from "../models/index";
import StorageUploads from "../models/storageUploads";

export default function PropertyListItem({ listing, thumbnail }) {
  const t = useTranslations("MyProperties");
  const router = useRouter();
  const { pathname } = router;
  const [isDeleting, setIsDeleting] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [contactRequests, setContactRequests] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const revs = await new ReviewsModel({
        propertyId: `${listing?.mId}`,
      }).getAllByQuery();
      if (revs && revs.length > 0) {
        setReviews(revs);
      }
    };

    const getContacts = async () => {
      const contacts = await new ContactRequestModel({
        listingId: `${listing?.mId}`,
      }).getAllByQuery();
      if (contacts && contacts.length > 0) {
        setContactRequests(contacts);
      }
    };

    if (listing?.mId) {
      getReviews();
      getContacts();
    }
  }, [listing]);

  const handleDelete = async () => {
    setIsDeleting(true);
    const deleteListing = await new ApartmentModel({
      id: listing.id,
    }).remove();
    if (thumbnail) {
      const removeImages = await new StorageUploads(
        `/apartments/${listing.mId}`
      ).removeAllWithThumbnail();
    }
    let contactsList = contactRequests.map((contact) => contact.id);
    let reviewsList = reviews.map((review) => review.id);
    if (contactsList.length > 0) {
      const removeContacts = await new ContactRequestModel(
        {}
      ).removeListOfItems(contactsList);
    }
    if (reviewsList.length > 0) {
      const removeReviews = await new ReviewsModel({}).removeListOfItems(
        reviewsList
      );
    }

    await fetch(`/api/updateStatus`, {
      method: "POST",
      body: JSON.stringify({
        status_data: {
          id: listing.mId,
        },
        action: "delete",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.success(t("deleted_successfully"));
    router.reload();
  };

  if (!listing) return null;
  return (
    <tr>
      <td className="py-3">
        <div className="d-flex align-items-center">
          <div className="me-3 me-lg-4">
            <div
              className="position-relative cover-img-img rounded-5 overflow-hidden"
              style={{ width: "130px", height: "100px" }}
            >
              {thumbnail ? (
                <Image src={thumbnail} layout="fill" />
              ) : (
                <div className="w-100 h-100 fs-18 border border-1 border-dark d-flex align-items-center justify-content-center rounded-3">
                  <i className="bi bi-house-door-fill"></i>
                </div>
              )}
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
