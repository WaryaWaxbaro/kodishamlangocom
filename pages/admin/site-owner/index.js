import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SiteOwnerLayout from "../../../layout/SiteOwnerLayout";
import {
  GeneralSettingsModel,
  UserModel,
  ApartmentModel,
  ReviewsModel,
  ContactRequestModel,
  ContactModel,
} from "../../../models";
import GeneralSettings from "../../../components/GeneralSettings";
import MainUsers from "../../../components/MainUsers";
import MainApartments from "../../../components/MainApartments";
import { sortByTimestamp } from "../../../utils/index";
import MainContacts from "../../../components/MainContacts";
import { useUser } from "../../../context/userContext";

const mainSettings = {
  title: "Site Owner",
  description: "Site Owner",
  keywords: "Site Owner",
  favicon: "",
  logo: "",
  coverImage: "",
  footerLogo: "",
  footerText: "",
  footerEmail: "",
  footerPhone: "",
  footerAddress: "",
  footerCopyright: "",
  mainColor: "",
  secondaryColor: "",
  smeTwitter: "",
  smeFacebook: "",
  smeWhatsapp: "",
};

export default function Home() {
  const t = useTranslations("SiteOwner");
  const [generalSettings, setGeneralSettings] = useState({});
  const [users, setUsers] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [contactRequests, setContactRequests] = useState([]);
  const [contacts, setContacts] = useState([]);

  const { currentUser, loadingUser } = useUser();

  useEffect(() => {
    /*     const getGeneralSettings = async () => {
      const gSettings = await new GeneralSettingsModel().getAll();
      if (gSettings.length > 0) {
        setGeneralSettings(gSettings[0]);
      } else if (gSettings.length === 0) {
        await new GeneralSettingsModel(mainSettings).save();
      }
    }; */

    const getUsers = async () => {
      const users = await new UserModel().getAll();
      if (users && users.length > 0) {
        setUsers(sortByTimestamp(users));
      }
    };

    const getApartments = async () => {
      const apartments = await new ApartmentModel().getAll();
      if (apartments && apartments.length > 0) {
        setApartments(sortByTimestamp(apartments));
      }
    };

    const getReviews = async () => {
      const reviews = await new ReviewsModel().getAll();
      if (reviews && reviews.length > 0) {
        setReviews(sortByTimestamp(reviews));
      }
    };

    const getContactRequests = async () => {
      const contactRequests = await new ContactRequestModel().getAll();
      if (contactRequests && contactRequests.length > 0) {
        setContactRequests(sortByTimestamp(contactRequests));
      }
    };

    const getContacts = async () => {
      const contacts = await new ContactModel().getAll();
      if (contacts && contacts.length > 0) {
        setContacts(sortByTimestamp(contacts));
      }
    };
    if (currentUser && currentUser.roles.includes("admin")) {
      getUsers();
      getApartments();
      getReviews();
      getContactRequests();
      getContacts();
    }
  }, [loadingUser]);

  const handleBlockUser = async (userId) => {
    const blockingUser = users.find((user) => user.id === userId);
    if (blockingUser) {
      const isBlocked = !blockingUser.isBlocked;
      const updateAllUsers = users.map((user) => {
        if (user.id === userId) {
          user.isBlocked = isBlocked;
        }
        return user;
      });
      setUsers(updateAllUsers);
      await new UserModel({ id: userId, isBlocked }).update();
    }
  };

  return (
    <SiteOwnerLayout>
      <div className="max-width-460 my-4">
        <p>{t("title")}</p>
        <p>{t("sub_title")}</p>
      </div>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link active"
            id="nav-users-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-users"
            type="button"
            role="tab"
            aria-controls="nav-users"
            aria-selected="true"
          >
            {t("users")}
          </button>
          <button
            className="nav-link"
            id="nav-apartments-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-apartments"
            type="button"
            role="tab"
            aria-controls="nav-apartments"
            aria-selected="false"
          >
            {t("apartments")}
          </button>
          <button
            className="nav-link"
            id="nav-contacts-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-contacts"
            type="button"
            role="tab"
            aria-controls="nav-contacts"
            aria-selected="false"
          >
            {t("contacts")}
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-users"
          role="tabpanel"
          aria-labelledby="nav-users-tab"
        >
          <MainUsers
            users={users}
            apartments={apartments}
            handleBlockUser={handleBlockUser}
          />
        </div>
        <div
          className="tab-pane fade"
          id="nav-apartments"
          role="tabpanel"
          aria-labelledby="nav-apartments-tab"
        >
          <MainApartments
            apartments={apartments}
            users={users}
            reviews={reviews}
            contactRequests={contactRequests}
          />
        </div>
        <div
          className="tab-pane fade py-3"
          id="nav-contacts"
          role="tabpanel"
          aria-labelledby="nav-contacts-tab"
        >
          <MainContacts contacts={contacts} />
        </div>
      </div>
    </SiteOwnerLayout>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: require(`../../../locales/${locale}.json`),
    },
  };
}
