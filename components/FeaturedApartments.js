import { useState, useRef } from "react";
import Link from "next/link";

export default function FeaturedApartments() {
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(true);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const handleScrollHorizontally = (side) => {
    let mainContainer = containerRef.current;
    let { width: viewportWidth } = calculatedViewport();
    let boxes = mainContainer.querySelectorAll(".list_container_box");
    let boxesSize = boxes.length;
    let firstBox = boxes[0];
    let lastBox = boxes[boxesSize - 1];
    let { x: firstChildX } = firstBox.getBoundingClientRect();
    let { x: lastChildX } = lastBox.getBoundingClientRect();
    let sideDifference = (viewportWidth - mainContainer.clientWidth) / 2;
    mainContainer.style.scrollBehavior = "smooth";
    if (side === "left") {
      mainContainer.scrollLeft += 280;
      if (firstChildX - sideDifference < 0) {
        // Show right arrow
        setShowRightArrow(true);
        setShowLeftArrow(lastChildX >= mainContainer.clientWidth);
      }
    }

    if (side === "right") {
      mainContainer.scrollLeft -= 280;
      setShowLeftArrow(mainContainer.clientWidth - boxesSize * 280 <= 0);

      if (firstChildX > 0) {
        setShowRightArrow(false);
      }
    }
  };

  const calculatedViewport = () => {
    let e = window,
      a = "inner";
    if (!("innerWidth" in window)) {
      a = "client";
      e = document.documentElement || document.body;
    }
    return { width: e[a + "Width"], height: e[a + "Height"] };
  };

  return (
    <section className="py-5">
      <div className="container-lg">
        <h2 className="fs-42 ls-6 mb-4 text-center">Featured Apartments</h2>
        <div className="w-100 position-relative">
          {showRightArrow && (
            <button
              onClick={() => handleScrollHorizontally("right")}
              className="listing-next position-absolute top-50 rounded-circle border-0 shadow-sm d-flex align-items-center justify-content-center p-2 bg-light z-to-5"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          )}
          {showLeftArrow && (
            <button
              onClick={() => handleScrollHorizontally("left")}
              className="position-absolute top-50 rounded-circle border-0 shadow d-flex align-items-center justify-content-center p-2 bg-light z-to-5 listing-previous"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          )}

          <div
            className="w-100 overflow-auto d-flex list_container height-200"
            ref={containerRef}
          >
            {apartments.map((apartment) => (
              <div
                key={apartment.id}
                className="list_container_box position-relative"
              >
                {apartment.image ? (
                  <Link className="text-decoration-none text-dark">
                    <Image
                      src="/images/home_for_sale.jpg"
                      layout="fill"
                      priority="true"
                    />
                    <div className="w-100 position-absolute start-0 bottom-0 p-2 bg-dark bg-opacity-75 text-white">
                      <h3 className="fs-5 mb-1">5000 Kshs</h3>
                      <p className="mb-0">Eastleigh, Nairobi</p>
                    </div>
                  </Link>
                ) : (
                  <div
                    className="w-280 height-200 bg-dark bg-opacity-25 d-flex align-items-center justify-content-center"
                    style={{ border: "1px dashed #ddd" }}
                  >
                    <p className="fs-12 mb-0 text-center">Advertise here</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="text-center my-5">
          <button
            href="/houses-for-sell"
            className="btn btn-lg btn-outline-primary border-2 rounded-0 text-uppercase"
          >
            View all apartments
          </button>
        </div>
      </div>
    </section>
  );
}

const apartments = [
  {
    id: 1,
    image: "",
    location: "",
    city: "",
    price: "",
    slug: "",
  },
  {
    id: 2,
    image: "",
    location: "",
    city: "",
    price: "",
    slug: "",
  },
  {
    id: 3,
    image: "",
    location: "",
    city: "",
    price: "",
    slug: "",
  },
  {
    id: 4,
    image: "",
    location: "",
    city: "",
    price: "",
    slug: "",
  },
  {
    id: 5,
    image: "",
    location: "",
    city: "",
    price: "",
    slug: "",
  },
];
