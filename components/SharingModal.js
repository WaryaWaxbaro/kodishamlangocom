import { useTranslations } from "next-intl";
import SharingLinks from "./SharingLinks";

export default function SharingModal({ sharingInfo }) {
  const t = useTranslations("Sharing");
  return (
    <div
      className="modal fade"
      id="sharingLinksModal"
      tabIndex="-1"
      aria-labelledby="sharingLinksModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="sharingLinksModalLabel">
              {t("share")}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <SharingLinks sharingInfo={sharingInfo} />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger rounded-0 btn-sm"
              data-bs-dismiss="modal"
            >
              {t("close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
