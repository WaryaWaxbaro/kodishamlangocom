import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import NewListingForm from "../components/NewListingForm";
import { ApartmentModel } from "../models";
import StorageUploads from "../models/storageUploads";
import { useUser } from "../context/userContext";

export default function newListing(props) {
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
        userId: `${userId}`,
      });
      const apartment = await apartmentModel.save();
      if (apartment.id) {
        // Get recently added apartment
        const savedApartment = await new ApartmentModel({
          id: apartment.id,
        }).getOne();

        console.log("savedApartment", savedApartment);

        if (savedApartment.mId) {
          console.log("savedApartment.mId", savedApartment.mId);
          if (formImages.length > 0) {
            toast.warning("Uploading images...");
            console.log("profileImage", formImages);
            await new StorageUploads(
              `apartments/thumbnails/${savedApartment.mId}`,
              thumbnailImage
            ).uploadResumable("shalow");

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

            console.log("uploadStorage", uploadStorage);
          }
        }
        setSyncData(false);
        setDisableBtn(false);
        router.push("/");
      }

      console.log("formData", { ...formData, userId });
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
