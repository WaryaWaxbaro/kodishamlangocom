import { useState } from "react";
import Range from "rc-slider";
import { formatPrice } from "../utils";

export default function AppSlider(props) {
  const { minMax, labelName, unit, formatUnit } = props;
  const mMax = minMax || [0, 100];
  const min = mMax[0];
  const max = mMax[1];
  const [rangeMinMax, setRangeMinMax] = useState(mMax);
  const handleRangeChange = (value) => {
    console.log(value);
    setRangeMinMax(value);
  };
  return (
    <div className="w-100 p-2 fs-14">
      <p className="text-center">{labelName}</p>
      <Range
        min={min}
        max={max}
        defaultValue={mMax}
        style={{ width: "100%" }}
        range
        onChange={handleRangeChange}
      />
      <div className="w-100 d-flex justify-content-between mt-4">
        <div>
          <span className="d-inline-block me-2">
            {formatUnit ? formatPrice(rangeMinMax[0]) : rangeMinMax[0]}{" "}
          </span>
          <span className="d-inline-block">
            {unit === "m" ? (
              <span>
                m<sup>2</sup>
              </span>
            ) : (
              unit
            )}
          </span>
        </div>
        <div>
          <span className="d-inline-block me-2">
            {formatUnit ? formatPrice(rangeMinMax[1]) : rangeMinMax[1]}
          </span>
          <span className="d-inline-block">
            {unit === "m" ? (
              <span>
                m<sup>2</sup>
              </span>
            ) : (
              unit
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
