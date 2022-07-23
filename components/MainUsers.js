import { useTranslations } from "next-intl";
import { unixToDate } from "../utils";
import { useUser } from "../context/userContext";

export default function MainUsers({ users, apartments, handleBlockUser }) {
  const t = useTranslations("SiteOwner");
  const { currentUser } = useUser();

  const getUserApartmentsCount = (id) => {
    return apartments.reduce((acc, apartment) => {
      if (apartment.userId === id) {
        acc++;
      }
      return acc;
    }, 0);
  };

  return (
    <div className="w-100 my-4">
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th></th>
              <th>{t("name")}</th>
              <th>{t("email")}</th>
              <th>{t("roles")}</th>
              <th>{t("status")}</th>
              <th>{t("registered")}</th>
              <th>{t("last_login")}</th>
              <th>{t("apartments")}</th>
              <th>{t("action")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.mId}>
                <td>{index + 1}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.roles.join(", ")}</td>
                <td>{user.isBlocked ? t("blocked") : t("active")}</td>
                <td>{unixToDate(user.createdAt?.seconds)}</td>
                <td>{unixToDate(user.lastLogin.seconds)}</td>
                <td>{getUserApartmentsCount(user.mId)}</td>
                <td>
                  <button
                    onClick={() => handleBlockUser(user.id)}
                    disabled={currentUser.mId === user.mId}
                    className="btn btn-danger min-w-100"
                  >
                    {user.isBlocked ? t("unblock") : t("block")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
