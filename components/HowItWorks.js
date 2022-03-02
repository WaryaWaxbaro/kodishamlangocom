export default function HowItWorks() {
  return (
    <section className="py-5" id="how-it-works-section">
      <div className="container">
        <h2 className="fs-46 text-center">How it works</h2>
        <div className="text-center my-3">
          <a
            href="/how-to-register"
            className="btn btn-primary btn-sm rounded-0 text-uppercase"
          >
            See steps to register
          </a>
        </div>
        <div className="row">
          <div className="col-12">
            <ul className="list-unstyled text-center">
              <li>
                Kodishamlango.com is a free service that can be used without
                registration.
              </li>
              <li>
                Registered users have more features such as making Announcements
                (Rent, Sale, Short stay), saving Alerts and so on.
              </li>
              <li>Below is a summary of available features.</li>
            </ul>
          </div>
          <div className="col-12 col-md-6">
            <div className="w-100 h-100 border">
              <h3 className="fs-4 mb-4 bg-dark text-center text-light p-3">
                Property Owners
              </h3>
              <div className="w-100 h-100 p-2">
                <div className="d-flex align-items-center mb-3">
                  <div className="square-20 me-3">
                    <i className="bi bi-check-lg"></i>
                  </div>
                  <p className="mb-0">
                    <a className="text-dark" href="/accounts/register">
                      Register
                    </a>{" "}
                    and choose a plan or{" "}
                    <a className="text-dark" href="/accounts/login">
                      Login
                    </a>{" "}
                    if already a member.
                  </p>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="square-20 me-3">
                    <i className="bi bi-check-lg"></i>
                  </div>
                  <p className="mb-0">
                    Make right announcement. For Example renting a house, make
                    Rent announcement.
                  </p>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="square-20 me-3">
                    <i className="bi bi-check-lg"></i>
                  </div>
                  <p className="mb-0">
                    Give a proper description about your property and attach
                    pictures.{" "}
                    <strong className="text-decoration-underline">
                      DO NOT USE PICTURES FROM THE INTERNET
                    </strong>
                    .
                  </p>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="square-20 me-3">
                    <i className="bi bi-check-lg"></i>
                  </div>
                  <p className="mb-0">
                    Follow the status of the announcement from your account.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="w-100 h-100 border">
              <h3 className="fs-4 mb-4 bg-dark text-center text-light p-3">
                Investors
              </h3>
              <div className="w-100 h-100 p-2">
                <div className="d-flex align-items-center mb-3">
                  <div className="square-20 me-3">
                    <i className="bi bi-check-lg"></i>
                  </div>
                  <p className="mb-0">
                    <a className="text-dark" href="/accounts/register">
                      Register
                    </a>{" "}
                    or{" "}
                    <a className="text-dark" href="/accounts/login">
                      Login
                    </a>
                    . You may still use the service without registration.
                  </p>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="square-20 me-3">
                    <i className="bi bi-check-lg"></i>
                  </div>
                  <p className="mb-0">
                    As a registered user you can save your search to get alerts
                    for matching results.
                  </p>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="square-20 me-3">
                    <i className="bi bi-check-lg"></i>
                  </div>
                  <p className="mb-0">
                    As a registered user you may give review to your transaction
                    or deals.
                  </p>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="square-20 me-3">
                    <i className="bi bi-check-lg"></i>
                  </div>
                  <p className="mb-0">
                    As a registered user you may save or like properties that
                    interests you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-width-350 mx-auto text-center mt-5">
          <button className="btn btn-primary btn-lg rounded-0 text-uppercase w-280">
            Register
          </button>
        </div>
      </div>
    </section>
  );
}
