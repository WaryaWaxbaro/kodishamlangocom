import { useEffect } from "react";
import { ApartmentModel } from "../models";

export default function ViewCounter({ propertyId, id }) {
  useEffect(() => {
    const updateViews = async () => {
      const views = await new ApartmentModel({
        id: `${id}`,
        propertyId: `${propertyId}`,
      }).incrementValue();
    };
    updateViews();
  }, [propertyId]);

  return null;
}
