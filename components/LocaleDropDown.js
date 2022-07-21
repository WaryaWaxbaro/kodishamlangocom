import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function LocaleDropDown(props) {
  const { currentLocale, setCurrentLocale, localesList } = props;
  const [showPropertyList, setShowPropertyList] = useState(false);

  const router = useRouter();
  const { pathname, asPath, query } = router;

  const handleListItemSelection = (locale) => {
    setShowPropertyList(!showPropertyList);
    setCurrentLocale(locale);
    router.push({ pathname, query }, asPath, { locale: locale });
  };

  return (
    <div className="position-relative w-100 h-34">
      <button
        onClick={() => setShowPropertyList(!showPropertyList)}
        className="w-100 h-100 btn fs-14 bg-gray-300 rounded-5 border-gray-200 ouline-none no-shadow d-flex align-items-center justify-content-between p-2"
      >
        <span className="d-flex align-items-center justify-content-center">
          <Image src={`/icons/${currentLocale}.png`} width={20} height={20} />
          <span className="d-inline-block mx-2">{currentLocale}</span>
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
          {localesList.map((locale, index) => (
            <li
              key={`${locale}_${index}`}
              onClick={() => handleListItemSelection(locale)}
              className={
                currentLocale === locale
                  ? "px-3 hover-bg-primary cursor-pointer bg-primary text-light mb-1"
                  : "px-3 hover-bg-primary cursor-pointer mb-1"
              }
            >
              <span className="d-flex align-items-center justify-content-around">
                <Image src={`/icons/${locale}.png`} width={20} height={20} />
                <span className="d-inline-block mx-2">{locale}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
