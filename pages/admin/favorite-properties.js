import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ReviewStars from "../../components/ReviewStars";
import { useUser } from "../../context/userContext";
import { ApartmentModel } from "../../models/index";
import StorageUploads from "../../models/storageUploads";
import { unixToDate, getApartmentPath } from "../../utils";
import Loader from "../../components/Loader";

export default function favoriteProperties() {
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
      const thumbnails = await new StorageUploads(
        `apartments/thumbnails`
      ).getListAllWithPath();
      setThumbnails(thumbnails);
      setFavApartments(sorted);
      setLoading(false);
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
                  <tr key={apartment.mId}>
                    <td className="py-3">
                      <div className="d-flex align-items-center">
                        <div className="me-3 me-lg-4">
                          <div
                            className="position-relative cover-img-img rounded-5 overflow-hidden"
                            style={{ width: "130px", height: "100px" }}
                          >
                            {getThumbnail(apartment.mId) && (
                              <Image
                                src={getThumbnail(apartment.mId)["imageUrl"]}
                                layout="fill"
                              />
                            )}
                          </div>
                        </div>
                        <div className="min-width-350">
                          <h2 className="fs-16 ls-6">{apartment.title}</h2>
                          <p className="fs-12 ls-6">
                            {apartment.street}, {apartment.sub_city},{" "}
                            {apartment.city}
                          </p>
                          <ReviewStars rating={4} count={6} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      {unixToDate(apartment.createdAt.seconds)}
                    </td>
                    <td className="py-3">164</td>
                    <td className="py-3">
                      <Link
                        href={`${getApartmentPath(
                          apartment.property_status,
                          apartment.slug
                        )}`}
                      >
                        <a className="btn btn-primary text-blue bg-transparent border-0 p-0">
                          <i className="bi bi-eye"></i>
                        </a>
                      </Link>
                    </td>
                    <td className="py-3">
                      {apartment.likes.indexOf(apartment.userId) >= 0 && (
                        <button
                          data-bs-toggle="tooltip"
                          title="unlike"
                          onClick={() =>
                            removeLike(apartment.id, apartment.userId)
                          }
                          className="btn btn-primary text-danger bg-transparent border-0 p-0"
                        >
                          <i className="bi bi-heart-fill"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>{loading ? <Loader /> : <p>No favorite properties</p>}</>
        )}
      </div>
    </div>
  );
}
