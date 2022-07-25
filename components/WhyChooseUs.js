import { useTranslations } from "next-intl";

const reasons_icons = {
  1: "fa-cogs",
  2: "fa-money-bill-wave",
  3: "fa-home",
};

export default function WhyChooseUs() {
  const t = useTranslations("WhyChooseUs");
  const t_reasons = useTranslations("WhyChooseUsReasons");
  let reasons =
    [
      {
        title: t_reasons("one.title"),
        content: t_reasons("one.content"),
        id: 1,
        icon: reasons_icons[1],
      },
      {
        title: t_reasons("two.title"),
        content: t_reasons("two.content"),
        id: 2,
        icon: reasons_icons[2],
      },
      {
        title: t_reasons("three.title"),
        content: t_reasons("three.content"),
        id: 3,
        icon: reasons_icons[3],
      },
      {
        title: t_reasons("four.title"),
        content: t_reasons("four.content"),
        id: 4,
        icon: reasons_icons[4],
      },
    ] || [];

  return (
    <section className="py-5 bg-white">
      <div className="container-lg">
        <div className="text-center">
          <h2 className="fw-bold fs-32 mb-3">{t("title")}</h2>
          <p>{t("sub_title")}</p>
        </div>
        {
          <div className="row mt-4">
            {reasons.map((reason, index) => {
              return (
                <div key={index} className="col-sm-6 col-lg-3 mb-4">
                  <div className="w-100 h-100 border border-gray-400 rounded-5 p-2">
                    <p className="mb-3 fs-46 text-primary text-center">
                      <i className={`fa ${reasons_icons[reason.id]}`}></i>
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
        }
      </div>
    </section>
  );
}
