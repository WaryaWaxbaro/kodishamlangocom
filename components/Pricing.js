export default function Pricing() {
  return (
    <section className="py-2 py-sm-5">
      <div className="container-lg">
        <h2 className="fs-46 mb-3 text-center">Pricing</h2>
        <div className="max-width-550 mx-auto text-center mb-3">
          <p>
            Pricing is based on monthly period or 30 days starting from the date
            of purchase. Pay only when you need.
          </p>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="max-width-280 h-100 mx-auto rounded-3 shadow p-2">
              <h3 className="fs-3 text-center my-3">Basic</h3>
              <hr className="bg-primary" />
              <div>
                <p className="text-center">
                  <span className="fs-64 fw-bold text-primary">0</span>
                  <span>Kshs</span>
                </p>
                <p className="ls-6 fw-bold text-center text-primary">
                  Suitable for basic users that want to rent or sell their
                  property.
                </p>
                <ul>
                  <li className="mb-2">Free account</li>
                  <li className="mb-2">Unlimited basic usage</li>
                  <li className="mb-2">1 Sell announcement or</li>
                  <li className="mb-2">1 Rent announcement</li>
                  <li className="mb-2">Save search alerts</li>
                  <li className="mb-2">Announcements management</li>
                  <li className="mb-2">Announcement's status</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="max-width-280 h-100 mx-auto rounded-3 shadow p-2">
              <h3 className="fs-3 text-center my-3">Starter</h3>
              <hr className="bg-primary" />
              <div>
                <p className="text-center">
                  <span className="fs-64 fw-bold text-primary">1000</span>
                  <span>Kshs/month</span>
                </p>
                <p className="ls-6 fw-bold text-center text-primary">
                  Suitable for seasonal Brokers, Investors that want to buy,
                  rent or sell more than one property.
                </p>
                <ul>
                  <li className="mb-2">Free account</li>
                  <li className="mb-2">Unlimited basic usage</li>
                  <li className="mb-2">
                    Up to 5 different announcements (Sell, Rent and other
                    services)
                  </li>
                  <li className="mb-2">Save search alerts</li>
                  <li className="mb-2">Announcements management</li>
                  <li className="mb-2">Announcement's status</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="max-width-280 h-100 mx-auto rounded-3 shadow p-2">
              <h3 className="fs-3 text-center my-3">Profession</h3>
              <hr className="bg-primary" />
              <div>
                <p className="text-center">
                  <span className="fs-64 fw-bold text-primary">5000</span>
                  <span>Kshs/month</span>
                </p>
                <p className="ls-6 fw-bold text-center text-primary">
                  Suitable for Real estate agents, Professional brokers,
                  Investors, that want to buy, rent or sell large number of
                  properties.
                </p>
                <ul>
                  <li className="mb-2">Free account</li>
                  <li className="mb-2">Unlimited basic usage</li>
                  <li className="mb-2">
                    Up to 8 different announcements (Sell, Rent and other
                    services)
                  </li>
                  <li className="mb-2">Save search alerts</li>
                  <li className="mb-2">Announcements management</li>
                  <li className="mb-2">Announcement's status</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="max-width-550 mx-auto text-center mb-3">
          <p>
            Talk to us, if you did not find suitable pricing option or you just
            want to discover more possibilities.
          </p>
        </div>
      </div>
    </section>
  );
}
