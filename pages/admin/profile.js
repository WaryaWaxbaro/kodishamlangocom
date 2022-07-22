import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { useTranslations } from "next-intl";

import ProfileCard from "../../components/ProfileCard";
import AdminLayout from "../../layout/AdminLayout";
import ProfileForm from "../../components/ProfileForm";
import { useUser } from "../../context/userContext";
import Loader from "../../components/Loader";
import { ProfileModel, UserModel } from "../../models";
import StorageUploads from "../../models/storageUploads";

const formInputs = {
  name: "",
  title: "",
  email: "",
  phone: "",
  address: "",
  intro: "",
  showProfile: true,
};

export default function Profile() {
  const t = useTranslations("Profile");
  const router = useRouter();
  const { loadingUser, currentUser } = useUser();

  const [toggleEdit, setToggleEdit] = useState(false);
  const [saveProfileData, setSaveProfileData] = useState("");
  const [profileForm, setProfileForm] = useState(formInputs);
  const [userProfile, setUserProfile] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [syncData, setSyncData] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [toastInfo, setToastInfo] = useState({
    status: "success",
    message: t("profile_update_success"),
  });

  useEffect(() => {
    const getUserProfile = async (profileId) => {
      const profileModel = await new ProfileModel({
        mId: `${profileId}`,
      }).getAllByQuery();

      if (profileModel && profileModel.length > 0) {
        const currentProfile = profileModel[0];
        setUserProfile(currentProfile);
        const profileUrl = await new StorageUploads(
          `profiles/${currentProfile.mId}`
        ).downloadURL();
        if (profileUrl) {
          setProfileImageUrl(profileUrl);
        }
      }
      setDataLoading(false);
    };
    if (currentUser?.profileId) {
      getUserProfile(currentUser.profileId);
    } else {
      if (!loadingUser) {
        setDataLoading(false);
      }
    }
  }, [loadingUser]);

  useEffect(() => {
    const updateData = async () => {
      const profileModel = await new ProfileModel({
        mId: `${currentUser.profileId}`,
      }).getAllByQuery();
      if (profileModel && profileModel.length > 0) {
        setUserProfile(profileModel[0]);
      }
    };
    if (syncData) {
      setSyncData(false);
      setToggleEdit(false);
      updateData();
      if (toastInfo.status === "success") {
        toast.success(toastInfo.message);
      } else {
        toast.error(toastInfo.message);
        setToastInfo({
          status: "success",
          message: t("profile_update_success"),
        });
      }
    }
  }, [syncData]);

  useEffect(() => {
    const createUpdateProfile = async (action) => {
      let hasImage = false;
      let currentUserProfileId = currentUser.profileId;
      if (currentUserProfileId) {
        const foundProfile = await new ProfileModel({
          mId: `${currentUser.profileId}`,
        }).getAllByQuery();
        if (foundProfile && foundProfile.length > 0) {
          const docSnap = await new ProfileModel({
            id: `${foundProfile[0].id}`,
            ...profileForm,
          }).update();

          if (profileImage) {
            hasImage = true;
          }
        }
      } else {
        // Save new profile
        const profile = await new ProfileModel({
          ...profileForm,
          userId: currentUser.mId,
        }).save();
        if (profile.id && currentUser.mId) {
          // Get saved profile data
          const savedProfile = await new ProfileModel({
            id: `${profile.id}`,
          }).getOne();

          // Save profile id to user
          const userDoc = await new UserModel({
            id: `${currentUser.uid}`,
            profileId: `${savedProfile.mId}`,
          }).update();

          if (profileImage) {
            hasImage = true;
          }
          setUserProfile(savedProfile);
        }
      }

      // Upload profile image if exists
      if (hasImage) {
        const uploadStorage = await new StorageUploads(
          `profiles/${currentUser.profileId}`,
          profileImage
        ).uploadResumable("shalow");

        const { error, downloadURL } = uploadStorage[0];

        if (downloadURL) {
          setProfileImageUrl(downloadURL);
        } else {
          setToastInfo({
            status: "error",
            message: `${t("profile_image_upload_failed")} ${error}`,
          });
        }

        setSyncData(true);
        hasImage = false;
      } else {
        setSyncData(true);
      }
    };

    if (saveProfileData) {
      createUpdateProfile(saveProfileData);
    }

    return () => {
      setSaveProfileData("");
    };
  }, [saveProfileData]);

  const handleProfileEdit = () => {
    setProfileForm(userProfile);
    setToggleEdit(!toggleEdit);
    setDisableBtn(false);
  };
  const handleCopyProfile = () => {
    setProfileForm({
      name: currentUser.displayName,
      title: t("agent"),
      email: currentUser.email,
      phone: "",
      address: "",
      intro: t("intro"),
    });
  };
  return (
    <AdminLayout>
      <div>
        <ToastContainer />
      </div>
      <div className="container-lg py-4">
        {dataLoading ? (
          <Loader />
        ) : (
          <div className="max-width-680 mx-auto shadow p-2 p-sm-3 rounded-3">
            {userProfile ? (
              <div className="w-100">
                {toggleEdit ? (
                  <div className="w-100">
                    <h3 className="fs-16 fw-bold">
                      {t("editing")} <em>{currentUser.displayName}&apos;s</em>{" "}
                      {t("profile")}
                    </h3>
                    <hr />
                    <div className="w-100 d-flex justify-content-end py-3">
                      <button
                        onClick={handleCopyProfile}
                        className="btn btn-primary btn-sm rounded-0 me-2"
                      >
                        <span className="d-flex align-item-center justify-content-center">
                          <span className="d-block me-3">{t("copy")}</span>
                          <span className="square-20">
                            <i className="bi bi-clipboard2-fill"></i>
                          </span>
                        </span>
                      </button>
                      <button
                        onClick={handleProfileEdit}
                        className="btn btn-dark btn-sm rounded-0"
                      >
                        <span className="d-flex align-item-center justify-content-center">
                          <span className="d-block me-3">{t("close")}</span>
                          <span className="square-20">
                            <i className="bi bi-x-circle"></i>
                          </span>
                        </span>
                      </button>
                    </div>

                    <ProfileForm
                      formAction="update"
                      setSaveProfileData={setSaveProfileData}
                      profileForm={profileForm}
                      setProfileForm={setProfileForm}
                      profileImage={profileImage}
                      setProfileImage={setProfileImage}
                      previewUrl={previewUrl}
                      setPreviewUrl={setPreviewUrl}
                      disableBtn={disableBtn}
                      setDisableBtn={setDisableBtn}
                    />
                  </div>
                ) : (
                  <>
                    <ProfileCard
                      profile={userProfile}
                      profileImageUrl={profileImageUrl}
                    />
                    <hr />
                  </>
                )}

                <div className="w-100 py-2 text-end">
                  {!toggleEdit && (
                    <button
                      onClick={handleProfileEdit}
                      className="btn btn-primary"
                    >
                      {t("edit_profile")}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-100">
                <h3 className="fs-16 fw-bold">
                  {t("profile_not_created_notification")}
                </h3>
                <div className="w-100 d-flex justify-content-end py-3">
                  <button
                    onClick={handleCopyProfile}
                    className="btn btn-primary btn-sm rounded-0 me-2"
                  >
                    <span className="d-flex align-item-center justify-content-center">
                      <span className="d-block me-3">{t("copy")}</span>
                      <span className="square-20">
                        <i className="bi bi-clipboard2-fill"></i>
                      </span>
                    </span>
                  </button>
                </div>
                <ProfileForm
                  formAction="new"
                  setSaveProfileData={setSaveProfileData}
                  profileForm={profileForm}
                  setProfileForm={setProfileForm}
                  profileImage={profileImage}
                  setProfileImage={setProfileImage}
                  previewUrl={previewUrl}
                  setPreviewUrl={setPreviewUrl}
                  disableBtn={disableBtn}
                  setDisableBtn={setDisableBtn}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: require(`../../locales/${locale}.json`),
    },
  };
}
