import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { countByCity, sortByCount } from "../utils";
import { StatusModel } from "../models";

export default function PopularPlaces() {
  const t = useTranslations("PopularPlaces");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getCities = async () => {
      const citiesList = await new StatusModel().getAll();
      if (citiesList.length > 0) {
        const status = JSON.parse(citiesList[0].status);
        const popularPlacesData = countByCity(status.data);
        const sortedCityByCount = sortByCount(popularPlacesData).slice(0, 8);
        setCities(sortedCityByCount);
      }
    };
    getCities();
  }, []);
  if (cities.length === 0) {
    return null;
  }
  return (
    <section className="bg-white py-5">
      <div className="container-lg">
        <div className="text-center">
          <h2 className="fw-bold fs-32 mb-3">{t("title")}</h2>
          <p>{t("sub_title")}</p>
        </div>
        <div className="row mt-4">
          {cities.map((sortedCity, index) => {
            return (
              <div
                key={sortedCity.city}
                className="col-12 col-sm-6 col-lg-4 mb-5"
              >
                <Link href={`/for-rent?city=${sortedCity.city}`}>
                  <div className="w-100 h-150 d-flex align-items-center border rounded-8 overflow-hidden cursor-pointer">
                    <div className="position-relative h-150 w-150 min-w-150 cover-img-img">
                      <Image
                        src={`/cities/city_${index + 1}.jpg`}
                        layout="fill"
                      />
                    </div>
                    <div className="h-100 w-100 d-flex flex-column justify-content-center p-3">
                      <h3 className="fs-16 fw-bold">{sortedCity.city}</h3>
                      <p className="fs-14 mb-0">
                        {sortedCity.count} {t("properties")}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
