import { useState, useEffect } from "react";
import { getFileUrl } from "../utils";
import StorageUploads from "../models/storageUploads";
import { GeneralSettingsModel } from "../models";

const mainSettings = [
  { id: "title", name: "Title", type: "text", value: "" },
  { id: "description", name: "Description", type: "text", value: "" },
  { id: "keywords", name: "Keywords", type: "text", value: "" },
  { id: "favicon", name: "Favicon", type: "file", value: "" },
  { id: "logo", name: "Logo", type: "file", value: "" },
  { id: "coverImage", name: "Cover Image", type: "file", value: "" },
  { id: "footerLogo", name: "Footer Logo", type: "file", value: "" },
  { id: "footerText", name: "Footer Text", type: "text", value: "" },
  { id: "footerEmail", name: "Footer Email", type: "email", value: "" },
  { id: "footerPhone", name: "Footer Phone", type: "text", value: "" },
  { id: "footerAddress", name: "Footer Address", type: "text", value: "" },
  { id: "footerCopyright", name: "Footer Copyright", type: "text", value: "" },
  { id: "mainColor", name: "Main Color", type: "color", value: "" },
  { id: "secondaryColor", name: "Secondary Color", type: "color", value: "" },
  { id: "smeTwitter", name: "Twitter Link", type: "text", value: "" },
  { id: "smeFacebook", name: "Facebook Link", type: "text", value: "" },
  { id: "smeWhatsapp", name: "Whatsapp Number", type: "text", value: "" },
];

const fileInputs = ["favicon", "logo", "coverImage", "footerLogo"];

export default function GeneralSettings({ gSettings }) {
  const settingFields = mainSettings.map((item) => {
    return { ...item, value: gSettings[item.id] };
  });

  const [generalSettings, setGeneralSettings] = useState(settingFields);
  const [previews, setPreviews] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [updateSettings, setUpdateSettings] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (fileInputs.includes(name)) {
      setPreviews({
        ...previews,
        [name]: { file: e.target.files, url: getFileUrl(e.target.files[0]) },
      });
    }

    const newSettings = generalSettings.map((item) => {
      if (item.id === name && !fileInputs.includes(name)) {
        return { ...item, value };
      }
      return item;
    });

    setGeneralSettings(newSettings);
  };

  const handleSubmit = async (e) => {
    setDisabled(true);
    let uploadSuccess = false;
    const previewKeys = Object.keys(previews);
    previewKeys.forEach(async (key, index) => {
      let uploadedFiles = await new StorageUploads(
        `generalSettings/${key}`,
        previews[key].file
      ).uploadResumable("shalow");
      if (uploadedFiles && uploadedFiles.length > 0) {
        const { downloadURL, error } = uploadedFiles[0];
        const newSettings = generalSettings.map((item) => {
          if (item.id === key) {
            return { ...item, value: downloadURL };
          }
          return item;
        });
        setGeneralSettings(() => newSettings);
      }
      if (index === previewKeys.length - 1) {
        setUpdateSettings(true);
      }
    });

    if (previewKeys.length === 0) {
      setUpdateSettings(true);
    }
  };

  useEffect(() => {
    const startUpdate = async (e) => {
      // get object from array of objects
      const settings = generalSettings.reduce((acc, item) => {
        acc[item.id] = item.value;
        return acc;
      }, {});

      // update settings
      await new GeneralSettingsModel({
        ...settings,
        id: gSettings.id,
      }).update();
      setDisabled(false);
      setPreviews({});
      setUpdateSettings(false);
    };
    if (updateSettings) {
      startUpdate();
    }
  }, [updateSettings]);

  return (
    <div className="w-100">
      <div className="row">
        {generalSettings.map((mSet) => (
          <div key={mSet.id} className="col-md-6 col-lg-4 mb-3">
            <div>
              <label htmlFor={mSet.id} className="form-label">
                {mSet.name}
              </label>
              <input
                style={mSet.type === "color" ? { height: "40px" } : {}}
                type={mSet.type}
                className="form-control"
                id={mSet.id}
                name={mSet.id}
                value={fileInputs.includes(mSet.id) ? null : mSet.value}
                onChange={handleChange}
              />
            </div>
            {mSet.type === "file" && (
              <>
                {previews[mSet.id] ? (
                  <img
                    src={previews[mSet.id]["url"]}
                    alt="logo"
                    className="img-fluid"
                  />
                ) : mSet.value ? (
                  <img src={mSet.value} alt="logo" className="img-fluid" />
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        ))}
        <div className="col-12 my-3">
          <div className="d-grid">
            <button
              onClick={handleSubmit}
              className="btn btn-primary btn-lg"
              disabled={disabled}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
