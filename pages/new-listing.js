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

  const { loadingUser, currentUser } = useUser();

  const router = useRouter();

  useEffect(() => {
    const addNewListing = async (userId) => {
      const apartmentModel = new ApartmentModel({
        ...formData,
        userId,
      });
      const apartment = await apartmentModel.save();
      if (apartment.id) {
        setSyncData(false);
        console.log("apartment", apartment.id);
        if (formImages.length > 0) {
          console.log("profileImage", formImages);
          const uploadStorage = await new StorageUploads(
            `apartments/${apartment.id}`,
            formImages
          ).uploadResumable();

          console.log("uploadStorage", uploadStorage);
        }
        router.push("/");
      }

      console.log("formData", { ...formData, userId });
    };
    if (syncData && currentUser?.uid) {
      if (currentUser.uid) {
        addNewListing(currentUser.uid);
      } else {
        toast.error("Please login to add listing");
      }
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
        />
      </div>
    </div>
  );
}
