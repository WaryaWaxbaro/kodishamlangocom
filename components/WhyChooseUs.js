const reasons = [
  {
    title: "Easy To Use",
    content:
      "Simple to use service for your business. No need to install anything. Just use the service and start your business.",
    icon: "fa-cogs",
  },
  {
    title: "Free Service",
    content:
      "Our Service does not charge any fee for using our this website. You can use our service for free.",
    icon: "fa-money-bill-wave",
  },
  {
    title: "Wide Range of Properties",
    content:
      "We have a wide range of properties for you to choose. You can choose any property you want.",
    icon: "fa-home",
  },
  {
    title: "Opportunity To Expand",
    content:
      "Our service are open to you to expand your business. We are always ready to help you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-5 bg-white">
      <div className="container-lg">
        <div className="text-center">
          <h2 className="fw-bold fs-32 mb-3">Why Choose Us</h2>
          <p>Simple Service for Realtors </p>
        </div>
        <div className="row mt-4">
          {reasons.map((reason, index) => {
            return (
              <div key={index} className="col-sm-6 col-lg-3 mb-4">
                <div className="w-100 h-100 border border-gray-400 rounded-5 p-2">
                  <p className="mb-3 fs-46 text-primary text-center">
                    <i className={`fa ${reason.icon}`}></i>
                  </p>
                  <div className="text-center">
                    <h4 className="fs-18 fw-bold mb-3">{reason.title}</h4>
                    <p>{reason.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
