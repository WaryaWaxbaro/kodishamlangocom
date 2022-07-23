import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

import StorageUploads from "../../../models/storageUploads";
import { ApartmentModel } from "../../../models";
import Loader from "../../../components/Loader";
import AdminLayout from "../../../layout/AdminLayout";
import NewListingForm from "../../../components/NewListingForm";
import { toast } from "react-toastify";
import Link from "next/link";

export default function MyProperty(props) {
  const t = useTranslations("MyProperties");
  const router = useRouter();
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
        setListing(listing[0]);
        setFormData(listing[0]);
      }
    };

    const getImages = async () => {
      const imagesList = await new StorageUploads(
        `apartments/${id}`
      ).getListAllWithPath();

      if (imagesList && imagesList.length > 0) {
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
      const apartmentModel = await new ApartmentModel({
        ...formData,
        id: listing.id,
      }).update();
      await fetch(`/api/updateStatus`, {
        method: "POST",
        body: JSON.stringify({
          status_data: {
            id: listing.mId,
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
    const updateImages = async () => {
      if (formImages.length > 0) {
        toast.warning(t("uploading_images"));
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
        toast.warning(t("deleting_images"));
      }
    };

    if (syncData) {
      updateListing();
      updateImages();
      removeImages();
      toast.success(t("update_success"));
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
          <h1 className="fs-28 mb-3">
            {t("editing")} {listing.title}
          </h1>
          <div>
            <Link href="/admin/my-properties">
              <a className="btn btn-sm btn-dark">{t("back")}</a>
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

export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: require(`../../../locales/${locale}.json`),
    },
  };
}
