import { useState, useEffect } from "react";

import AppDropdown from "./AppDropdown";
import AppSlider from "./AppSlider";

import cities from "../utils/cities";

export default function Search(props) {
  const { setActiveSearchValues } = props;
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedPropertyStatus, setSelectedPropertyStatus] = useState("");
  const [selectedBedrooms, setSelectedBedrooms] = useState("");
  const [selectedBathrooms, setSelectedBathrooms] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    setSearchValues({
      ...searchValues,
      property_type: selectedPropertyType,
      property_status: selectedPropertyStatus,
      bedrooms: selectedBedrooms,
      bathrooms: selectedBathrooms,
      area: selectedArea,
      price: selectedPrice,
    });
  }, [
    selectedPropertyType,
    selectedPropertyStatus,
    selectedBedrooms,
    selectedBathrooms,
    selectedArea,
    selectedPrice,
  ]);

  const [searchValues, setSearchValues] = useState({
    location: "",
    property_type: null,
    property_status: null,
    bedrooms: null,
    bathrooms: null,
    area: null,
    price: null,
    facilities: [
      { name: "AC", key: "ac", value: false },
      { name: "Fan", key: "fan", value: false },
      { name: "Swimming Pool", key: "swimming_pool", value: false },
      { name: "Central Heating", key: "central_heating", value: false },
      { name: "Laundry Room", key: "laundry_room", value: false },
      { name: "Gym", key: "gym", value: false },
      { name: "Alarm", key: "alarm", value: false },
      { name: "Window Covering", key: "window_covering", value: false },
      { name: "WiFi", key: "wifi", value: false },
      { name: "TV", key: "tv", value: false },
      { name: "Dryer", key: "dryer", value: false },
      { name: "Microwave", key: "microwave", value: false },
      { name: "Washer", key: "washer", value: false },
      { name: "Refrigerator", key: "refrigerator", value: false },
      { name: "Outdoor Shower", key: "outdoor_shower", value: false },
      { name: "Parking", key: "parking", value: false },
      { name: "Lift", key: "lift", value: false },
      { name: "Balcony", key: "balcony", value: false },
      { name: "Fully Furnished", key: "fully_furnished", value: false },
      { name: "Play Ground", key: "play_ground", value: false },
      { name: "Breakfast", key: "breakfast", value: false },
      { name: "Arrival Pickup", key: "arrival_pickup", value: false },
      { name: "Departure Pickup", key: "departure_pickup", value: false },
    ],
  });

  const handleSearchValues = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    if (name === "facilities") {
      let facilities = searchValues.facilities.map((facility) => {
        if (facility.key === e.target.id) {
          return { ...facility, value: e.target.checked };
        }

        return facility;
      });

      setSearchValues({ ...searchValues, facilities });
    } else {
      setSearchValues({ ...searchValues, [name]: val });
    }
  };

  const handleSubmitSearch = () => {
    let activeValues = Object.keys(searchValues)
      .map((obj) => {
        if (obj === "facilities") {
          let filteredFacility = searchValues[obj].filter(
            (facility) => facility.value
          );
          return filteredFacility;
        } else {
          if (searchValues[obj]) {
            return { [obj]: searchValues[obj] };
          }
        }
      })
      .filter((sv) => sv);

    console.log(activeValues);
    setShowAdvanced(false);
  };
  return (
    <div className="position-relative w-100 rounded-10 border border-5 border-bg-light bg-light py-3 px-2">
      <div className="row">
        <div className="col-12 col-md-3 mb-2">
          <input
            className="form-control h-100 bg-light fs-14 border-gray-200 p-2 rounded-5 outline-none no-shadow"
            type="text"
            list="cities"
            name="location"
            id="location"
            placeholder="Location"
            onChange={handleSearchValues}
          />
          <datalist id="cities">
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </div>
        <div className="col-12 col-md-3 mb-2">
          <AppDropdown
            defaultItem="Property Type"
            zIndex={100}
            mainListItem={["Family House", "Apartment", "Bangalow"]}
            setSelectedListItem={setSelectedPropertyType}
          />
        </div>
        <div className="col-12 col-md-3 mb-2">
          <div className="w-100 h-100">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-100 h-100 btn fs-14 bg-light rounded-5 border-gray-200 ouline-none d-flex align-items-center justify-content-between p-2"
            >
              <span className="d-block">Advanced Search</span>
              <span className="d-block text-primary fs-16">
                <i className="bi bi-three-dots-vertical"></i>
              </span>
            </button>
          </div>
        </div>
        <div className="col-12 col-md-3 mb-2">
          <div className="w-100 h-100">
            <button
              onClick={handleSubmitSearch}
              className="w-100 h-100 btn btn-primary text-light fs-14 rounded-5 ouline-none p-2"
            >
              Search Now
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
          <div className="col-12 col-md-6 col-lg-4 mb-2">
            <AppDropdown
              defaultItem="Property Status"
              zIndex={100}
              mainListItem={["For Sale", "For Rent"]}
              icon="<i class='bi bi-house-fill text-primary'></i>"
              setSelectedListItem={setSelectedPropertyStatus}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-2">
            <AppDropdown
              defaultItem="Bedrooms"
              zIndex={100}
              mainListItem={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              icon="<i class='bi bi-house-fill text-primary'></i>"
              setSelectedListItem={setSelectedBedrooms}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-2">
            <AppDropdown
              defaultItem="Bathrooms"
              zIndex={100}
              mainListItem={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              icon="<i class='bi bi-house-fill text-primary'></i>"
              setSelectedListItem={setSelectedBathrooms}
            />
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-12 col-md-6 mb-2">
                <div className="my-3">
                  <AppSlider
                    minMax={[0, 110000]}
                    labelName="Area Size"
                    unit="m"
                    setSelectedRange={setSelectedArea}
                  />
                </div>
                <div className="my-3">
                  <AppSlider
                    minMax={[0, 110000]}
                    labelName="Price Range"
                    unit="Kshs"
                    formatUnit={true}
                    setSelectedRange={setSelectedPrice}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 mb-2">
                <div className="w-100 py-md-5 ps-md-4">
                  <div className="row">
                    {searchValues.facilities.map((facility) => (
                      <div key={facility.key} className="col-12 col-sm-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={facility.value}
                            name="facilities"
                            id={facility.key}
                            onChange={handleSearchValues}
                          />
                          <label
                            className="form-check-label fs-14"
                            htmlFor={facility.key}
                          >
                            {facility.name}
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
