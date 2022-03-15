import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import Search from "./Search";

export default function Hero() {
  const [activeSearchValues, setActiveSearchValues] = useState([]);

  return (
    <>
      <div className="position-fixed start-0 top-0 w-100 h-90-vh z-1">
        <div className="position-relative w-100 h-100 cover-img-bottom">
          <Image src="/bg-img.jpeg" layout="fill" alt="Kodishamlango.com" />
          <div className="position-absolute start-0 top-0 w-100 h-100 hero-bg"></div>
        </div>
      </div>
      <header className="w- 100 h-80-vh d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="max-width-lg-80p mx-auto">
            <div className="text-center">
              <h1 className="fs-36 text-capitalize fw-bold lh-12 text-light d-flex justify-content-center">
                <span className="d-block me-2">Find </span>
                <span className="typewriter-container">
                  <Typewriter
                    options={{
                      strings: [
                        "Apartments",
                        "Homes For Sale",
                        "Homes For Rent",
                        "Holiday Apartments",
                        "Plots",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 120,
                      deleteSpeed: 120,
                    }}
                  />
                </span>
              </h1>
              <p className="text-light">
                Find Apartments and Homes For Rent, For Holiday, For Sale and
                Plots.
              </p>
            </div>
            <div className="w-100">
              <div className="w-100 text-center mt-4 mb-3">
                {apartLinks.map((ap, index) => (
                  <Link key={ap.name} href={ap.url}>
                    <a className="btn btn-light rounded-5 fs-14 min-w-96 me-3 mb-2">
                      {ap.name}
                    </a>
                  </Link>
                ))}
              </div>
              <Search setActiveSearchValues={setActiveSearchValues} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

const apartLinks = [
  {
    name: "For Sale",
    url: "/",
  },
  {
    name: "For Rent",
    url: "/",
  },
  ,
  {
    name: "For Holiday",
    url: "/",
  },
  {
    name: "Plots",
    url: "/",
  },
];
