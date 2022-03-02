export default function ContactInfo() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="max-width-680 mx-auto">
          <p className="text-center fs-20">
            If you may need more information related to our services. Please do
            not hesitate to contact us. Our team is ready to help.
          </p>
          <div className="text-center">
            <button className="btn btn-primary btn-lg rounded-0 px-5">
              <span className="d-flex align-item-center justify-content-center">
                <span className="d-block me-3">Contact us</span>
                <span className="square-20">
                  <i className="bi bi-envelope"></i>
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
