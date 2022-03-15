import { useState } from "react";
import { removeWhiteSpace } from "../utils";

export default function AppDropdown(props) {
  const { defaultItem, zIndex, mainListItem, icon, setSelectedListItem } =
    props;
  const [showPropertyList, setShowPropertyList] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultItem || "Select");

  const handleListItemSelection = (e) => {
    setShowPropertyList(!showPropertyList);
    let selectedItemText = e.target.textContent;
    setSelectedItem(selectedItemText);
    setSelectedListItem(selectedItemText);
  };

  return (
    <div className="position-relative w-100 h-100">
      <button
        onClick={() => setShowPropertyList(!showPropertyList)}
        className="w-100 h-100 btn fs-14 bg-light rounded-5 border-gray-200 ouline-none no-shadow d-flex align-items-center justify-content-between p-2"
      >
        <span className="d-block">
          {icon && (
            <span
              className="d-inline-block me-2"
              dangerouslySetInnerHTML={{ __html: icon }}
            ></span>
          )}
          <span className="d-inline-block">{selectedItem}</span>
        </span>
        <span className="d-block">
          <i className="bi bi-chevron-down"></i>
        </span>
      </button>
      {showPropertyList && (
        <ul
          className="position-absolute start-0 w-100 list-unstyled bg-light rounded-5 border border-1 border-gray-200 py-2 mt-2 overflow-auto z-to-100"
          style={{ height: "auto", maxHeight: "180px" }}
        >
          <li
            onClick={(e) => handleListItemSelection(e)}
            className="px-3 py-1 hover-bg-primary cursor-pointer"
          >
            <span className="d-flex align-items-center"></span>
            {defaultItem || "Select"}
          </li>
          {mainListItem.map((list, index) => (
            <li
              key={`${removeWhiteSpace(list)}_${index}`}
              onClick={(e) => handleListItemSelection(e)}
              className="px-3 py-1 hover-bg-primary cursor-pointer"
            >
              {list}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
