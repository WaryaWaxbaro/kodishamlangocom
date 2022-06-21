import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import NewListingForm from "../components/NewListingForm";
import { ApartmentModel } from "../models";
import StorageUploads from "../models/storageUploads";
import { useUser } from "../context/userContext";

import { slugString } from "../utils";

export default function NewListing(props) {
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
            toast.warning("Uploading images...");
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
                  toast.success("Image uploaded successfully");
                } else {
                  toast.error("Image upload failed");
                }
              });
            }
          }
          toast.success("Listing added successfully");
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

    const updateStatus = async () => {
      await fetch(`/api/updateStatus`, {
        method: "POST",
        body: JSON.stringify({
          status_data: {
            id: 12,
            city: formData.city,
            country: formData.country,
            price: formData.price,
            area: formData.area,
            property_status: formData.property_status,
          },
          action: "update",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    };

    if (syncData && currentUser?.mId) {
      if (currentUser.mId) {
        //addNewListing(currentUser.mId);
        updateStatus();
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
      <h1 className="fs-28 mb-3">Add New Property Listing</h1>
      <p className="mb-1">
        Provide accurate information to market your property
      </p>
      <p>
        Fields marked with <span className="text-primary">*</span> are
        compulsary
      </p>
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
