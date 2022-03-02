import Image from "next/image";

export default function ApartmentActions() {
  return (
    <section className="container-lg">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div className="col">
          <div className="w-100 h-100 text-center p-2 p-sm-3">
            <div className="mx-auto mb-3" style={{ width: "145px" }}>
              <Image
                src="/images/homes_search.png"
                width={145}
                height={145}
                layout="responsive"
              />
            </div>
            <h3 className="fs-3 mb-3">Looking for home</h3>
            <p>
              Find a new home or check out homes that are for sale or rent homes
              on the market.
            </p>
            <button className="btn btn-outline-dark border-2 rounded-0 ls-6 mb-3 text-uppercase">
              Homes for sale
            </button>
            <button className="btn btn-outline-dark border-2 rounded-0 ls-6 mb-3 text-uppercase">
              Homes for rent
            </button>
          </div>
        </div>
        <div className="col">
          <div className="w-100 h-100 text-center p-2 p-sm-3">
            <div className="mx-auto mb-3" style={{ width: "145px" }}>
              <Image
                src="/images/home_sell.png"
                width={145}
                height={145}
                layout="responsive"
              />
            </div>
            <h3 className="fs-3 mb-3">Selling a house</h3>
            <p>
              Whether you are selling an apartment yourself or through a broker
              - we will help you succeed.
            </p>
            <button className="btn btn-outline-dark border-2 rounded-0 ls-6 mb-3 text-uppercase">
              Start selling
            </button>
          </div>
        </div>
        <div className="col">
          <div className="w-100 h-100 text-center p-2 p-sm-3">
            <div
              className="mx-auto mb-3"
              width="145"
              height="145"
              style={{ width: "145px" }}
            >
              <Image
                src="/images/homes_rent.png"
                width={145}
                height={145}
                layout="responsive"
              />
            </div>
            <h3 className="fs-3 mb-3">Renting an apartment</h3>
            <p>
              Make a free rental announcement and find a new tenant quickly and
              easily with our help.
            </p>
            <button className="btn btn-outline-dark border-2 rounded-0 ls-6 mb-3 text-uppercase">
              Start renting
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
