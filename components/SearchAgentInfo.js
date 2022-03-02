import Image from "next/image";
export default function SearchAgentInfo() {
  return (
    <section className="bg-primary bg-opacity-25 py-5 my-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
              <div className="w-150 mb-5 mb-md-0">
                <Image
                  src="/images/notification.png"
                  width={150}
                  height={150}
                />
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="w-100">
              <h4 className="fs-1 mb-4">
                Search Alert - Don't miss the house of your dream
              </h4>
              <p>
                Be the first to know about new homes. You will be among the
                first to be notified when new homes that match your search are
                announced. This will ensure that you do not miss any
                announcement of new homes.
              </p>
              <h5 className="fs-5">
                With the help of Search Alert you will be
              </h5>
              <ul>
                <li>Among the first to be notified about new announcements</li>
                <li>Notified if the price of a house changes</li>
                <li>Informed about upcoming new constructions</li>
              </ul>
              <div className="pt-4">
                <button className="btn btn-outline-dark rounded-0 border-2 text-uppercase">
                  Create Search alert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
