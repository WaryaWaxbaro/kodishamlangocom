import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import NewListingForm from "../components/NewListingForm";
import { ApartmentModel } from "../models";
import StorageUploads from "../models/storageUploads";
import { useUser } from "../context/userContext";

import { slugString } from "../utils";

export default function NewListing(props) {
  const t = useTranslations("NewListing");
  const [formData, setFormData] = useState({});
  const [formImages, setFormImages] = useState([]);
  const [syncData, setSyncData] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState(null);

  const { loadingUser, currentUser } = useUser();

  const router = useRouter();

  useEffect(() => {
    const addNewListing = async (userId) => {
      const apartmentModel = new ApartmentModel({
        ...formData,
        slug: slugString(`${formData.title} ${formData.city}`),
        userId: `${userId}`,
      });
      const apartment = await apartmentModel.save();
      if (apartment.id) {
        // Get recently added apartment
        const savedApartment = await new ApartmentModel({
          id: apartment.id,
        }).getOne();

        if (savedApartment.mId) {
          if (formImages.length > 0) {
            toast.warning(t("uploading_images"));
            if (thumbnailImage) {
              await new StorageUploads(
                `apartments/thumbnails/${savedApartment.mId}`,
                thumbnailImage
              ).uploadResumable("shalow");
            } else {
              await new StorageUploads(
                `apartments/thumbnails/${savedApartment.mId}`,
                [formImages[0]]
              ).uploadResumable("shalow");
            }

            const uploadStorage = await new StorageUploads(
              `apartments/${savedApartment.mId}`,
              formImages
            ).uploadResumable();

            if (uploadStorage && uploadStorage.length > 0) {
              uploadStorage.forEach(async (storage) => {
                const { error, downloadURL } = storage;

                if (downloadURL) {
                  toast.success(t("image_upload_success"));
                } else {
                  toast.error(t("image_upload_fail"));
                }
              });
            }
          }
          toast.success(t("listing_added_success"));
          setSyncData(false);
          setDisableBtn(false);
          await fetch(`/api/updateStatus`, {
            method: "POST",
            body: JSON.stringify({
              status_data: {
                id: savedApartment.mId,
                city: savedApartment.city,
                country: savedApartment.country,
                price: savedApartment.price,
                area: savedApartment.area,
                property_status: savedApartment.property_status,
              },
              action: "update",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          let slug =
            savedApartment.property_status.indexOf("rent") > -1
              ? "/for-rent"
              : savedApartment.property_status.indexOf("sale") > -1
              ? "/for-sale"
              : savedApartment.property_status.indexOf("short stay") > -1
              ? "/short-stay"
              : "for-rent";
          router.push(`${slug}/${savedApartment.slug}`);
        }
      }
    };

    if (syncData && currentUser?.mId) {
      if (currentUser.mId) {
        addNewListing(currentUser.mId);
      } else {
        toast.error("Please login to add listing");
      }
    } else if (syncData) {
      toast.error("Please login to add listing");
      setSyncData(false);
    }
  }, [syncData, loadingUser]);

  return (
    <div className="container-lg py-5">
      <h1 className="fs-28 mb-3">{t("title")}</h1>
      <p className="mb-1">{t("sub_title")}</p>
      <p>{t("fields_compulsory_info")}</p>
      <div className="w-100">
        <NewListingForm
          setFormData={setFormData}
          setFormImages={setFormImages}
          setSyncData={setSyncData}
          disableBtn={disableBtn}
          setDisableBtn={setDisableBtn}
          setThumbnailImage={setThumbnailImage}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
}
