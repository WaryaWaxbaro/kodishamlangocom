import { useState, useEffect } from "react";
import { removeWhiteSpace } from "../utils";

export default function AppDropdown(props) {
  const {
    defaultItem,
    zIndex,
    mainListItem,
    icon,
    setSelectedListItem,
    mainLabelName,
    translation,
    translateSection,
  } = props;

  let translatedLabel =
    translation && mainLabelName === defaultItem && translateSection[0] === 1
      ? translation(mainLabelName)
      : translation && mainLabelName && translateSection[0] === 1
      ? translation(mainLabelName)
      : translation && defaultItem && translateSection[0] === 1
      ? translation(defaultItem)
      : mainLabelName
      ? mainLabelName
      : defaultItem;

  console.log(translatedLabel);

  const [showPropertyList, setShowPropertyList] = useState(false);
  const [selectedItem, setSelectedItem] = useState(translatedLabel || "Select");

  useEffect(() => {
    setSelectedItem(translatedLabel || "Select");
  }, [translatedLabel]);

  const handleListItemSelection = (val) => {
    console.log("value is", val);
    setShowPropertyList(!showPropertyList);
    let selectedItemText = val;
    let itemVal = selectedItemText === defaultItem ? "" : selectedItemText;
    console.log("itemVal is", itemVal);
    const translateList =
      mainListItem.indexOf("Most Recent") >= 0
        ? translation(selectedItemText)
        : selectedItemText;
    setSelectedItem(translateList);
    setSelectedListItem(itemVal);
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
          <span className="d-inline-block me-2">{selectedItem}</span>
        </span>
        <span className="d-block">
          {showPropertyList ? (
            <i className="bi bi-chevron-up"></i>
          ) : (
            <i className="bi bi-chevron-down"></i>
          )}
        </span>
      </button>
      {showPropertyList && (
        <ul
          className="position-absolute start-0 w-100 list-unstyled bg-light rounded-5 border border-1 border-gray-200 py-2 mt-2 overflow-auto z-to-100 transition-4s"
          style={{
            height: showPropertyList ? "auto" : "0",
            maxHeight: "180px",
          }}
        >
          <li
            onClick={() => handleListItemSelection(translatedLabel)}
            className="px-3 py-1 hover-bg-primary cursor-pointer"
          >
            <span className="d-flex align-items-center"></span>
            {translatedLabel}
          </li>

          {mainListItem.map((item, index) => (
            <li
              key={`${removeWhiteSpace(item)}_${index}`}
              onClick={() => handleListItemSelection(item)}
              className={
                defaultItem === item
                  ? "px-3 py-1 hover-bg-primary cursor-pointer bg-primary text-light mb-1"
                  : "px-3 py-1 hover-bg-primary cursor-pointer mb-1"
              }
            >
              {translation && translateSection[1] === 1
                ? translation(item)
                : item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
