import Link from "next/link";
import Image from "next/image";

export default function PopularPlaces() {
  return (
    <section className="bg-white py-5">
      <div className="container-lg">
        <div className="text-center">
          <h2>Popular Places</h2>
          <p>Properties In Most Popular Places</p>
        </div>
        <div className="row mt-4">
          <div className="col-12 col-sm-6 col-lg-3 mb-4">
            <Link href="/">
              <div className="w-100 h-150 d-flex align-items-center border rounded-8 overflow-hidden">
                <div className="position-relative h-150 w-150 min-w-150 cover-img-img">
                  <Image
                    src="/images/cover/nairobi.png"
                    height={150}
                    width={150}
                    layout="fill"
                  />
                </div>
                <div className="h-100 w-100 d-flex flex-column justify-content-center p-3">
                  <h3 className="fs-16 fw-bold">Nairobi</h3>
                  <p className="fs-14 mb-0">450 Properties</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 mb-4">
            <Link href="/">
              <div className="w-100 h-150 d-flex align-items-center border rounded-8 overflow-hidden">
                <div className="position-relative h-150 w-150 min-w-150 cover-img-img">
                  <Image
                    src="/images/cover/mombasa.png"
                    height={150}
                    width={150}
                    layout="fill"
                  />
                </div>
                <div className="h-100 w-100 d-flex flex-column justify-content-center p-3">
                  <h3 className="fs-16 fw-bold">Mombasa</h3>
                  <p className="fs-14 mb-0">324 Properties</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
