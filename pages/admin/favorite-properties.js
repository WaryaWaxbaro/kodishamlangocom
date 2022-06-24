import { useState, useEffect } from "react";

import { useUser } from "../../context/userContext";
import { ApartmentModel } from "../../models/index";
import StorageUploads from "../../models/storageUploads";

import Loader from "../../components/Loader";
import AdminLayout from "../../layout/AdminLayout";

import FavoritePropertiesRow from "../../components/FavoritePropertiesRow";

export default function FavoriteProperties() {
  const { currentUser } = useUser();
  const [favApartments, setFavApartments] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFavApartments = async () => {
      const apartments = await new ApartmentModel({
        likes: currentUser.mId,
      }).findByContains();
      const sorted = apartments.sort((a, b) => {
        return a.createdAt.seconds - b.createdAt.seconds;
      });
      if (sorted.length > 0) {
        const thumbnails = await new StorageUploads(
          `apartments/thumbnails`
        ).getListAllWithPath();
        setThumbnails(thumbnails);
        setFavApartments(sorted);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    if (currentUser) {
      getFavApartments();
    }
  }, [currentUser]);

  const getThumbnail = (id) => {
    return thumbnails.find((thumb) => thumb.path_.split("/").indexOf(id) >= 0);
  };

  const removeLike = async (id, like) => {
    const newApartment = favApartments.map((apartment) => {
      if (apartment.likes.indexOf(like) >= 0) {
        const newLikes = apartment.likes.filter((lk) => lk !== like);
        return { ...apartment, likes: newLikes };
      }
      return apartment;
    });
    setFavApartments(newApartment);
    await new ApartmentModel({ id, like }).updateLikes();
  };

  return (
    <AdminLayout>
      <div className="container-lg">
        <div className="max-width-960 mx-auto shadow rounded-10 my-4 p-2 p-sm-3 p-lg-4">
          {favApartments.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead className="table">
                  <tr className="table-primary">
                    <th>My Property</th>
                    <th className="fw-normal">Date Added</th>
                    <th className="fw-normal">Views</th>
                    <th className="fw-normal" colSpan={2}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {favApartments.map((apartment) => (
                    <FavoritePropertiesRow
                      key={apartment.mId}
                      apartment={apartment}
                      currentUser={currentUser}
                      getThumbnail={getThumbnail}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <>{loading ? <Loader /> : <p>No favorite properties</p>}</>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
