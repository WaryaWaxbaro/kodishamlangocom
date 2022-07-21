import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useTranslations } from "next-intl";

import AppDropdown from "./AppDropdown";
import AppSlider from "./AppSlider";
import { property_features, toUnderscoreKey, property_types } from "../utils";

import { StatusModel } from "../models";
import { currency } from "../utils/staticSetup";

const searchFormFields = {
  location: "",
  apartment_type: null,
  property_status: null,
  bedrooms: null,
  bathrooms: null,
  area: null,
  price: null,
};

const property_features_keys = property_features.map((feature) => {
  let k = toUnderscoreKey(feature);
  searchFormFields[k] = false;
  return k;
});

const property_types_keys = {
  "For Sale": "sale",
  "For Rent": "rent",
  "For Holiday": "short stay",
  Plot: "plot",
};

const property_status_routes = {
  "For Sale": "/for-sale",
  "For Rent": "/for-rent",
  "For Holiday": "/for-holiday",
  Plot: "/plots",
};

const emptyParams = ["Bedrooms", "Bathrooms", "Property Type", "Select City"];

export default function Search(props) {
  const t = useTranslations("Search");
  const t_property_type = useTranslations("PropertyTypes");
  const t_property_features = useTranslations("PropertyFeatures");
  const t_property_status = useTranslations("PropertyStatus");

  const router = useRouter();
  const { route, query } = router;
  const isHomePage = route === "/";

  const { setActiveSearchValues } = props;
  const [selectedPropertyType, setSelectedPropertyType] = useState(
    query.apartment_type || "Property Type"
  );
  const [selectedPropertyStatus, setSelectedPropertyStatus] = useState(
    query.property_status || "Property Status"
  );
  const [selectedBedrooms, setSelectedBedrooms] = useState(
    query.bedrooms || "Bedrooms"
  );
  const [selectedBathrooms, setSelectedBathrooms] = useState(
    query.bathrooms || "Bathrooms"
  );
  const [selectedArea, setSelectedArea] = useState(query.area || "");
  const [selectedPrice, setSelectedPrice] = useState(query.price || "");
  const [searchCity, setSearchCity] = useState(query.city || "Select City");

  const [searchValues, setSearchValues] = useState(searchFormFields);

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [homePageRoute, setHomePageRoute] = useState("/for-sale");

  const [cities, setCities] = useState([]);
  const [maxPrice, setMaxPrice] = useState([0, 1000000]);
  const [maxArea, setMaxArea] = useState([0, 1000]);

  useEffect(() => {
    const getCities = async () => {
      const citiesList = await new StatusModel().getAll();
      if (citiesList.length > 0) {
        const status = JSON.parse(citiesList[0].status);
        setCities(status.cities);
        setMaxPrice([0, status.price]);
        setMaxArea([0, status.area]);
      }
    };
    getCities();
  }, []);

  useEffect(() => {
    setSearchValues({
      ...searchValues,
      apartment_type: selectedPropertyType,
      property_status: selectedPropertyStatus,
      bedrooms: selectedBedrooms,
      bathrooms: selectedBathrooms,
      area: selectedArea,
      price: selectedPrice,
      city: searchCity,
    });
    if (property_status_routes[selectedPropertyStatus]) {
      setHomePageRoute(property_status_routes[selectedPropertyStatus]);
    }
  }, [
    selectedPropertyType,
    selectedPropertyStatus,
    selectedBedrooms,
    selectedBathrooms,
    selectedArea,
    selectedPrice,
    searchCity,
  ]);

  const handleSearchValues = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    setSearchValues({
      ...searchValues,
      [name]: e.target.type === "checkbox" ? e.target.checked : val,
    });
  };

  const handleSubmitSearch = () => {
    let sQuery = Object.keys(searchValues).reduce((acc, key) => {
      let val = searchValues[key];
      if (val && emptyParams.indexOf(val) === -1) {
        if (Array.isArray(searchValues[key])) {
          return { ...acc, [key]: searchValues[key].join(",") };
        } else if (key === "property_status") {
          let val = searchValues[key];
          return { ...acc, [key]: property_types_keys[val] };
        } else {
          return { ...acc, [key]: searchValues[key] };
        }
      }
      return acc;
    }, {});

    let urlQuery = queryString.stringify(sQuery);
    setShowAdvanced(false);
    isHomePage
      ? router.push(`${homePageRoute}?${urlQuery}`)
      : router.push(`${route}?${urlQuery}`);
  };

  const handleResetSearch = (e) => {
    let findClasses = e.target.classList;
    if (
      findClasses.contains("reset-search") ||
      findClasses.contains("row") ||
      findClasses.contains("col-12")
    ) {
      if (showAdvanced) {
        setShowAdvanced(false);
      }
    }
  };

  return (
    <div
      onClick={handleResetSearch}
      className="reset-search position-relative w-100 rounded-10 border border-5 border-bg-light bg-light py-3 px-2"
    >
      <div className="row">
        <div className="col-12 col-md-3 mb-2">
          <AppDropdown
            defaultItem={searchCity}
            mainLabelName="Select City"
            zIndex={100}
            mainListItem={cities}
            icon="<i class='bi bi-house-fill text-primary'></i>"
            setSelectedListItem={setSearchCity}
            translation={t}
            translateSection={[1, 0]}
          />
        </div>
        <div className="col-12 col-md-3 mb-2">
          <AppDropdown
            defaultItem={selectedPropertyType}
            mainLabelName="Property Type"
            zIndex={100}
            mainListItem={property_types}
            setSelectedListItem={setSelectedPropertyType}
            translation={t_property_type}
            translateSection={[1, 1]}
          />
        </div>
        <div className="col-12 col-md-3 mb-2">
          <div className="w-100 h-100">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-100 h-100 btn fs-14 bg-light rounded-5 border-gray-200 ouline-none d-flex align-items-center justify-content-between p-2"
            >
              {showAdvanced ? (
                <>
                  <span className="d-block">{t("close_search")}</span>
                  <span className="d-block text-primary fs-16">
                    <i className="bi bi-x-lg"></i>
                  </span>
                </>
              ) : (
                <>
                  <span className="d-block">{t("advanced_search")}</span>
                  <span className="d-block text-primary fs-16">
                    <i className="bi bi-three-dots-vertical"></i>
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className="col-12 col-md-3 mb-2">
          <div className="w-100 h-100">
            <button
              onClick={handleSubmitSearch}
              className="w-100 h-100 btn btn-primary text-light fs-14 rounded-5 ouline-none p-2"
            >
              {t("search_now")}
            </button>
          </div>
        </div>
      </div>
      <div
        className={
          showAdvanced
            ? "position-absolute top-100 start-0 w-100 bg-light p-2 mt-1 z-to-80"
            : "d-none position-absolute top-100 start-0 w-100 bg-light p-2 mt-1 z-to-80"
        }
      >
        <div className="row">
          {isHomePage && (
            <div className="col-12 col-md-6 col-lg-4 mb-2">
              <AppDropdown
                defaultItem={selectedPropertyStatus}
                mainLabelName="Property Status"
                zIndex={100}
                mainListItem={["For Sale", "For Rent", "For Holiday"]}
                icon="<i class='bi bi-house-fill text-primary'></i>"
                setSelectedListItem={setSelectedPropertyStatus}
                translation={t_property_status}
                translateSection={[1, 1]}
              />
            </div>
          )}

          <div className="col-12 col-md-6 col-lg-4 mb-2">
            <AppDropdown
              defaultItem={selectedBedrooms}
              mainLabelName="Bedrooms"
              zIndex={100}
              mainListItem={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              icon="<i class='bi bi-house-fill text-primary'></i>"
              setSelectedListItem={setSelectedBedrooms}
              translation={t}
              translateSection={[1, 0]}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-2">
            <AppDropdown
              defaultItem={selectedBathrooms}
              mainLabelName="Bathrooms"
              zIndex={100}
              mainListItem={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              icon="<i class='bi bi-house-fill text-primary'></i>"
              setSelectedListItem={setSelectedBathrooms}
              translation={t}
              translateSection={[1, 0]}
            />
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-12 col-md-6 mb-2">
                <div className="my-3">
                  <AppSlider
                    minMax={maxArea}
                    labelName={t("area_size")}
                    unit="m"
                    setSelectedRange={setSelectedArea}
                  />
                </div>
                <div className="my-3">
                  <AppSlider
                    minMax={maxPrice}
                    labelName={t("price_range")}
                    unit={currency}
                    formatUnit={true}
                    setSelectedRange={setSelectedPrice}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 mb-2">
                <div className="reset-search w-100 py-md-5 ps-md-4">
                  <div className="row">
                    {property_features_keys.map((key, index) => (
                      <div key={key} className="col-12 col-sm-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={key}
                            name={key}
                            checked={searchValues[key]}
                            value={searchValues[key]}
                            onChange={handleSearchValues}
                          />
                          <label className="form-check-label" htmlFor={key}>
                            {t_property_features(property_features[index])}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
