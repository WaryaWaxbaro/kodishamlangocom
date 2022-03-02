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
