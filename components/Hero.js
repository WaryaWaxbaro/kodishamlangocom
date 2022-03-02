import Image from "next/image";

export default function Hero() {
  return (
    <header className="w-100 min-height-60vh position-relative bg-dark bg-opacity-75 d-flex align-items-center justify-content-center">
      <div className="position-absolute start-0 top-0 w-100 h-100 z-1">
        <div className="position-relative w-100 h-100">
          <Image
            src="/images/home_for_sale.jpg"
            layout="fill"
            priority="true"
          />
        </div>
      </div>
      <div className="max-width-80p px-2 my-5">
        <h1 className="fs-38 text-light text-center">
          <span className="d-block">Easy way to</span>{" "}
          <span className="d-block">Rent, Sell, Buy Properties Online</span>
        </h1>
        <div className="text-center">
          <button className="btn btn-light rounded-0 my-3 text-uppercase">
            Add New Advertisement
          </button>
        </div>
        <p className="text-center text-white mt-3">
          Find Apartments and Homes For Rent, For Holiday(Short Stay), For Sale
          and Plots.
        </p>
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-around">
          <button className="btn rounded-0 bg-light text-dark text-uppercase mb-2 btn-min-width">
            For Rent
          </button>
          <button className="btn rounded-0 bg-light text-dark text-uppercase mb-2 btn-min-width">
            Short stay
          </button>
          <button className="btn rounded-0 bg-light text-dark text-uppercase mb-2 btn-min-width">
            For Sale
          </button>
          <button className="btn rounded-0 bg-light text-dark text-uppercase mb-2 btn-min-width">
            Plots
          </button>
        </div>
      </div>
    </header>
  );
}
