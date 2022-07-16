import { useState, useEffect } from "react";
import SiteOwnerLayout from "../../../layout/SiteOwnerLayout";
import { GeneralSettingsModel } from "../../../models";
import GeneralSettings from "../../../components/GeneralSettings";

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
  const [generalSettings, setGeneralSettings] = useState({});
  const [users, setUsers] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [contactRequests, setContactRequests] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getGeneralSettings = async () => {
      const gSettings = await new GeneralSettingsModel().getAll();
      if (gSettings.length > 0) {
        setGeneralSettings(gSettings[0]);
      } else if (gSettings.length === 0) {
        await new GeneralSettingsModel(mainSettings).save();
      }
    };
    getGeneralSettings();
  }, []);

  return (
    <SiteOwnerLayout>
      <div className="max-width-460">
        <p>This section you can manage some section of the website</p>
        <p>Things that you can manage include</p>
        <ul>
          <li>
            Updating and Changing general settings. Update header logo, footer
            logo, main heading picture and some texts.
          </li>
          <li>Users management; View users, Block abusive users</li>
          <li>Manage Apartment. Check owners. Remove apartments</li>
        </ul>
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
            Users
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
            Apartments
          </button>
          <button
            className="nav-link"
            id="nav-settings-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-settings"
            type="button"
            role="tab"
            aria-controls="nav-settings"
            aria-selected="false"
          >
            Settings
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
          ... Users management
        </div>
        <div
          className="tab-pane fade"
          id="nav-apartments"
          role="tabpanel"
          aria-labelledby="nav-apartments-tab"
        >
          ... Apartments management
        </div>
        <div
          className="tab-pane fade py-3"
          id="nav-settings"
          role="tabpanel"
          aria-labelledby="nav-settings-tab"
        >
          <GeneralSettings gSettings={generalSettings} />
        </div>
      </div>
    </SiteOwnerLayout>
  );
}
