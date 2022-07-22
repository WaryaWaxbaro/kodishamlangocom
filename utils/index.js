export const formatPrice = (price) => {
  return (price * 1).toLocaleString(undefined, {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
};

export const getApartmentPath = (category, slug) => {
  let cat = category || [];
  if (cat.indexOf("sale") >= 0) {
    return `/for-sale/${slug}`;
  } else if (cat.indexOf("rent") >= 0) {
    return `/for-rent/${slug}`;
  } else if (cat.indexOf("holiday") >= 0) {
    return `/short-stay/${slug}`;
  } else {
    return "/";
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
  "Triplex",
  "Penthouse",
  "Shop",
  "Office",
  "Business Space",
  "Business Center",
  "Land",
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

// Zero-pad a number
export const zeroPad = (num, places) => {
  let zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
};

// Convert unix timestamp to date
export const unixToDate = (unix) => {
  let date = new Date(unix * 1000);
  let year = date.getFullYear();
  let month = zeroPad(date.getMonth() + 1, 2);
  let day = zeroPad(date.getDate(), 2);
  let hour = zeroPad(date.getHours(), 2);
  let min = zeroPad(date.getMinutes(), 2);
  let sec = zeroPad(date.getSeconds(), 2);
  let time = `${day}/${month}/${year} ${hour}:${min}:${sec}`;
  return time;
};

export const urlToObject = async (url) => {
  const response = await fetch(url);
  // here image is url/location of image
  const blob = await response.blob();
  const file = new File([blob], "image.jpg", { type: blob.type });
};

export const sortOrder = [
  "Most Recent",
  "Top Selling",
  "Most Viewed",
  "Price (low to hight)",
  "Price (hight to low)",
];

export const sortDataByQuery = (data, query) => {
  let sortedData = data;
  Object.keys(query).forEach((param) => {
    if (param === "price" || param === "area") {
      let val = query[param].split(",");
      sortedData = sortedData.filter(
        (listing) => listing[param] >= val[0] && listing[param] <= val[1]
      );
    } else if (param === "bathrooms" || param === "bedrooms") {
      sortedData = sortedData.filter(
        (listing) => listing[param] >= query[param]
      );
    }
    if (param === "property_status") {
      sortedData = sortedData.filter(
        (listing) => listing[param].indexOf(query[param]) >= 0
      );
    } else {
      sortedData = sortedData.filter(
        (listing) => listing[param] === query[param]
      );
    }
  });

  return sortedData;
};

export const getAverageRating = (ratings) => {
  let sum = 0;
  ratings.forEach((rating) => {
    sum += rating.rating;
  });
  return sum / ratings.length;
};

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const countByCity = (data) => {
  let cityCount = {};
  data.forEach((listing) => {
    if (cityCount[listing.city]) {
      cityCount[listing.city]++;
    } else {
      cityCount[listing.city] = 1;
    }
  });
  return cityCount;
};

export const sortByCount = (countByCity) => {
  let sortedCount = [];
  Object.keys(countByCity).forEach((city) => {
    sortedCount.push({ city, count: countByCity[city] });
  });

  sortedCount = sortedCount.sort((a, b) => {
    return b.count - a.count;
  });

  return sortedCount;
};

export const getYesterdayDate = () => {
  let date = new Date();
  date.setDate(date.getDate() - 1);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const getFileUrl = (file) => {
  let url = URL.createObjectURL(file);
  return url;
};

// Sort by date
export const sortByDate = (data) => {
  let sortedData = data;
  sortedData = sortedData.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return sortedData;
};

// Sort by timestamp
export const sortByTimestamp = (data) => {
  let sortedData = data;
  sortedData = sortedData.sort((a, b) => {
    return b.createdAt - a.createdAt;
  });

  return sortedData;
};

export const timeSince = (date, localization) => {
  let locale = localization || {
    years: "years",
    months: "months",
    days: "days",
    hours: "hours",
    minutes: "minutes",
    seconds: "seconds",
    and: "and",
  };
  let seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;
  let year = seconds / 31536000;
  let months = seconds / 2592000;
  let days = seconds / 86400;
  let hours = seconds / 3600;
  let minutes = seconds / 60;

  if (year > 1) {
    return `${Math.floor(year)} ${locale.years}`;
  }

  if (months > 1) {
    return `${Math.floor(months)} ${locale.months}`;
  }

  if (days > 1) {
    return `${Math.floor(days)} ${locale.days}`;
  }

  if (hours > 1) {
    var h = Math.floor(hours);
    if (h <= 2) {
      return `${h} ${locale.hours} ${locale.and} ${Math.floor(
        (hours - h) * 60
      )} ${locale.minutes}`;
    }
    return `${Math.floor(hours)} ${locale.hours}`;
  }

  if (minutes > 1) {
    return `${Math.floor(minutes)} ${locale.minutes}`;
  }
  return `${Math.floor(seconds)} ${locale.seconds}`;
};
