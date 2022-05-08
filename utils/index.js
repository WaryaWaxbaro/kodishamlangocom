export const formatPrice = (price) => {
  return (price * 1).toLocaleString(undefined, {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
};

export const getApartmentPath = (category, id) => {
  let cat = category || [];
  if (cat.indexOf("sell") >= 0) {
    return `houses-for-sell/${id}`;
  } else if (cat.indexOf("rent") >= 0) {
    return `houses-for-rent/${id}`;
  } else if (cat.indexOf("holiday") >= 0) {
    return `short-stay/${id}`;
  } else {
    return "";
  }
};

export const removeWhiteSpace = (str) => {
  return typeof str === "string" ? str.replace(/ /g, "") : str;
};

export const toUnderscoreKey = (str) => {
  if (typeof str === "string") {
    return str.toLowerCase().split(" ").join("_");
  }

  return str;
};

export const property_types = [
  "Apartment",
  "Bungalow",
  "House",
  "Mansion",
  "Villa",
  "Flat",
  "Mini Flat",
  "Duplex",
  "Shop",
  "Business Space",
  "Business Center",
  "Plot",
  "Commercial",
  "Residential",
];

export const property_features = [
  "AC",
  "Fan",
  "Swimming Pool",
  "Central Heating",
  "Laundry Room",
  "Gym",
  "Alarm",
  "Window Covering",
  "WiFi",
  "TV",
  "Dryer",
  "Microwave",
  "Washer",
  "Refrigerator",
  "Outdoor Shower",
  "Parking",
  "Lift",
  "Balcony",
  "Fully Furnished",
  "Play Ground",
  "Breakfast",
  "Arrival Pickup",
  "Departure Pickup",
];

export const randomKeys = (length = 10) => {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};

export const slugString = (str) => {
  let slug = str.toLowerCase().split(" ").join("-");
  return typeof str === "string" ? `${slug}-${randomKeys()}` : str;
};
