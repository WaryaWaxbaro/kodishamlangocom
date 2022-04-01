import Image from "next/image";
import ReviewStars from "../../components/ReviewStars";

export default function myProperties() {
  return (
    <div className="container-lg">
      <div className="max-width-960 mx-auto shadow rounded-10 my-4 p-2 p-sm-3 p-lg-4">
        <div className="table-responsive">
          <table className="table">
            <thead className="table">
              <tr className="table-primary">
                <th>My Property</th>
                <th className="fw-normal">Date Added</th>
                <th className="fw-normal">Views</th>
                <th className="fw-normal" colSpan={2}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3">
                  <div className="d-flex align-items-center">
                    <div className="me-3 me-lg-4">
                      <div
                        className="position-relative cover-img-img rounded-5 overflow-hidden"
                        style={{ width: "130px", height: "100px" }}
                      >
                        <Image src="/images/cover/nairobi.png" layout="fill" />
                      </div>
                    </div>
                    <div className="min-width-350">
                      <h2 className="fs-16 ls-6">Luxury Villa House</h2>
                      <p className="fs-12 ls-6">
                        Est St, 77 - Central Park South, NYC
                      </p>
                      <ReviewStars rating={4} count={6} />
                    </div>
                  </div>
                </td>
                <td className="py-3">04/01/2020</td>
                <td className="py-3">164</td>
                <td className="py-3">
                  <button className="btn btn-primary text-warning bg-transparent border-0 p-0">
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </td>
                <td className="py-3">
                  <button className="btn btn-primary text-danger bg-transparent border-0 p-0">
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-3">
                  <div className="d-flex align-items-center">
                    <div className="me-3 me-lg-4">
                      <div
                        className="position-relative cover-img-img rounded-5 overflow-hidden"
                        style={{ width: "130px", height: "100px" }}
                      >
                        <Image src="/images/cover/mombasa.png" layout="fill" />
                      </div>
                    </div>
                    <div className="min-width-350">
                      <h2 className="fs-16 ls-6">Luxury Villa House</h2>
                      <p className="fs-12 ls-6">
                        Est St, 77 - Central Park South, NYC
                      </p>
                      <ReviewStars rating={3} count={7} />
                    </div>
                  </div>
                </td>
                <td className="py-3">04/01/2020</td>
                <td className="py-3">164</td>
                <td className="py-3">
                  <button className="btn btn-primary text-warning bg-transparent border-0 p-0">
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </td>
                <td className="py-3">
                  <button className="btn btn-primary text-danger bg-transparent border-0 p-0">
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
