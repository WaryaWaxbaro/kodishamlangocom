import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import { ApartmentModel } from "../../../models";
import StorageUploads from "../../../models/storageUploads";
import { useUser } from "../../../context/userContext";
import AdminLayout from "../../../layout/AdminLayout";
import PropertyListItem from "../../../components/PropertyListItem";
import { sortByTimestamp } from "../../../utils/index";

export default function MyProperties() {
  const t = useTranslations("MyProperties");
  const [listings, setListings] = useState([]);
  const [thumnails, setThumnails] = useState([]);

  const { currentUser, loadingUser } = useUser();

  useEffect(() => {
    const getApartments = async (userId) => {
      const listing = await new ApartmentModel({
        userId: `${userId}`,
      }).getAllByQuery();
      if (listing) {
        setListings(sortByTimestamp(listing));
      }
    };

    if (currentUser) {
      getApartments(currentUser.mId);
    }
  }, [loadingUser]);

  useEffect(() => {
    const getThumbnails = async (listingIds) => {
      const thumbnails = listingIds.forEach(async (listingId) => {
        const thumbanil = await new StorageUploads(
          `apartments/thumbnails/${listingId}`
        ).downloadURL();
        setThumnails((prevThumbnails) => [
          ...prevThumbnails,
          { id: listingId, img: thumbanil },
        ]);
        return thumbanil;
      });
    };
    if (listings) {
      const listingIds = listings.map((listing) => listing.mId);
      getThumbnails(listingIds);
    }
  }, [listings]);

  const getThumbnail = (listingId) => {
    const foundThumbnail = thumnails.find(
      (thumbnail) => thumbnail.id === listingId
    );
    return foundThumbnail?.img ? foundThumbnail.img : "";
  };
  return (
    <AdminLayout>
      <div className="container-lg">
        <div className="max-width-960 mx-auto shadow rounded-10 my-4 p-2 p-sm-3 p-lg-4">
          <div className="table-responsive">
            <table className="table">
              <thead className="table">
                <tr className="table-primary">
                  <th>{t("my_properties")}</th>
                  <th className="fw-normal">{t("date_added")}</th>
                  <th className="fw-normal">{t("views")}</th>
                  <th className="fw-normal" colSpan={2}>
                    {t("actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <PropertyListItem
                    key={listing.mId}
                    listing={listing}
                    thumbnail={getThumbnail(listing.mId)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: require(`../../../locales/${locale}.json`),
    },
  };
}
