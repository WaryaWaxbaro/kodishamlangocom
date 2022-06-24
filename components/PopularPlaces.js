import Link from "next/link";
import Image from "next/image";
import { countByCity, sortByCount } from "../utils";
import savedData from "../data.json";

const popularPlacesData = countByCity(savedData.data);
const sortedCityByCount = sortByCount(popularPlacesData).slice(0, 8);

export default function PopularPlaces() {
  if (sortedCityByCount.length === 0) {
    return null;
  }
  return (
    <section className="bg-white py-5">
      <div className="container-lg">
        <div className="text-center">
          <h2 className="fw-bold fs-32 mb-3">Popular Places</h2>
          <p>Properties In Most Popular Places</p>
        </div>
        <div className="row mt-4">
          {sortedCityByCount.map((sortedCity, index) => {
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
                        {sortedCity.count} Properties
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
