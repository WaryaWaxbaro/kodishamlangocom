import Image from "next/image";
import Typewriter from "typewriter-effect";

export default function Hero() {
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
                <span className="d-block me-2">Find Your Dream </span>
                <Typewriter
                  options={{
                    strings: ["Apartment", "House", "Plaza", "Home"],
                    autoStart: true,
                    loop: true,
                    delay: 120,
                    deleteSpeed: 120,
                  }}
                />
              </h1>
              <p className="text-light">
                Find Apartments and Homes For Rent, For Holiday, For Sale and
                Plots.
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
