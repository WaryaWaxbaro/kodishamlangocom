import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import StorageUploads from "../../../models/storageUploads";
import { ApartmentModel } from "../../../models";
import { toUnderscoreKey, property_features } from "../../../utils";
import Loader from "../../../components/Loader";
import AdminLayout from "../../../layout/AdminLayout";
import { useUser } from "../../../context/userContext";
import NewListingForm from "../../../components/NewListingForm";
import { toast } from "react-toastify";
import Link from "next/link";

export default function MyProperty(props) {
  const router = useRouter();
  console.log("router", router);
  const { id } = router.query;
  const [listing, setListing] = useState({});

  const [formData, setFormData] = useState({});
  const [formImages, setFormImages] = useState([]);
  const [syncData, setSyncData] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);
  const [removedCurrentImages, setRemovedCurrentImages] = useState([]);

  useEffect(() => {
    const getListing = async () => {
      const listing = await new ApartmentModel({
        mId: `${id}`,
      }).getAllByQuery();
      if (listing) {
        console.log("listing????", listing);
        setListing(listing[0]);
        setFormData(listing[0]);
      }
    };

    const getImages = async () => {
      const imagesList = await new StorageUploads(
        `apartments/${id}`
      ).getListAll();

      if (imagesList && imagesList.length > 0) {
        console.log("imagesList", imagesList);
        setCurrentImages(imagesList);
      }
    };

    if (id) {
      getListing();
      getImages();
    }
  }, [id]);

  useEffect(() => {
    const updateListing = async () => {
      console.log("formData........", formData);
      const apartmentModel = await new ApartmentModel({
        ...formData,
        id: listing.id,
      }).update();
    };
    const updateImages = async () => {
      if (formImages.length > 0) {
        toast.warning("Uploading images...");
        console.log("profileImage", formImages);
        if (thumbnailImage) {
          await new StorageUploads(
            `apartments/thumbnails/${listing.mId}`,
            thumbnailImage
          ).uploadResumable("shalow");
        }

        const uploadStorage = await new StorageUploads(
          `apartments/${listing.mId}`,
          formImages
        ).uploadResumable();
      }
    };
    const removeImages = async () => {
      if (removedCurrentImages.length > 0) {
        removedCurrentImages.forEach(async (image) => {
          await new StorageUploads(`${image}`, null).deleteObject();
        });
        toast.warning("Deleting images...");
      }
    };

    if (syncData) {
      updateListing();
      updateImages();
      removeImages();
      toast.success("Listing updated successfully");
      router.push("/admin/my-properties");
    }
  }),
    [syncData];

  if (!listing) {
    return <Loader />;
  }

  return (
    <AdminLayout>
      <div className="container-lg py-5">
        <div className="d-flex justify-content-between mb-4">
          <h1 className="fs-28 mb-3">Editing {listing.title}</h1>
          <div>
            <Link href="/admin/my-properties">
              <a className="btn btn-sm btn-dark">Back</a>
            </Link>
          </div>
        </div>
        <div className="w-100">
          <NewListingForm
            setFormData={setFormData}
            formFieldValues={formData}
            setFormImages={setFormImages}
            setSyncData={setSyncData}
            disableBtn={disableBtn}
            setDisableBtn={setDisableBtn}
            setThumbnailImage={setThumbnailImage}
            currentImages={currentImages}
            setCurrentImages={setCurrentImages}
            removedCurrentImages={removedCurrentImages}
            setRemovedCurrentImages={setRemovedCurrentImages}
            isEditing={true}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
