import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

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

export default function profile() {
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
  const [toastInfo, setToastInfo] = useState({
    status: "success",
    message: "Profile updated successfully",
  });

  useEffect(() => {
    const updateData = async () => {
      const profileModel = await new ProfileModel({
        id: currentUser.profileId,
      }).getOne();
      if (profileModel) {
        setUserProfile(profileModel);
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
          message: "Profile updated successfully",
        });
      }
    }
  }, [syncData]);

  useEffect(() => {
    const getUserProfile = async (profileId) => {
      const profileModel = await new ProfileModel({ id: profileId }).getOne();
      if (profileModel) {
        setUserProfile(profileModel);
        const profileUrl = await new StorageUploads(
          `profiles/${profileId}`
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
    const createProfile = async () => {
      const profile = await new ProfileModel(profileForm).save();
      if (profile.id && currentUser.uid) {
        setUserProfile(profile);
        const userDoc = await new UserModel({
          id: currentUser.uid,
          profileId: `${profile.id}`,
        }).update();
        setSyncData(true);
      }
    };
    const updateProfile = async () => {
      if (currentUser?.profileId) {
        const docSnap = await new ProfileModel({
          id: currentUser.profileId,
          ...profileForm,
        }).update();

        if (profileImage) {
          console.log("profileImage", profileImage);
          const uploadStorage = await new StorageUploads(
            `profiles/${currentUser.profileId}`,
            profileImage
          ).uploadResumable();

          console.log("uploadStorage", uploadStorage);
          const { error, downloadURL } = uploadStorage[0];
          console.log("error--- ", error);
          console.log("downloadURL--- ", downloadURL);
          if (downloadURL) {
            setProfileImageUrl(downloadURL);
          } else {
            setToastInfo({
              status: "error",
              message: `Profile image upload failed. ${error}`,
            });
          }
        }
        setSyncData(true);
      }
    };

    if (saveProfileData && saveProfileData === "new") {
      createProfile();
    }
    if (saveProfileData && saveProfileData === "update") {
      updateProfile();
    }

    return () => {
      setSaveProfileData("");
    };
  }, [saveProfileData]);

  const handleProfileEdit = () => {
    setProfileForm(userProfile);
    setToggleEdit(!toggleEdit);
  };
  const handleCopyProfile = () => {
    setProfileForm({
      name: currentUser.displayName,
      title: "Agent of Property",
      email: currentUser.email,
      phone: "",
      address: "",
      intro: "Your partner for excelent deals",
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
                      Editing <em>{currentUser.displayName}'s</em> Sales Profile
                    </h3>
                    <hr />
                    <div className="w-100 d-flex justify-content-end py-3">
                      <button
                        onClick={handleCopyProfile}
                        className="btn btn-primary btn-sm rounded-0 me-2"
                      >
                        <span className="d-flex align-item-center justify-content-center">
                          <span className="d-block me-3">Copy</span>
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
                          <span className="d-block me-3">Close</span>
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
                      Edit profile
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-100">
                <h3 className="fs-16 fw-bold">
                  You have not created a profile yet. Please create a profile
                </h3>
                <div className="w-100 d-flex justify-content-end py-3">
                  <button
                    onClick={handleCopyProfile}
                    className="btn btn-primary btn-sm rounded-0 me-2"
                  >
                    <span className="d-flex align-item-center justify-content-center">
                      <span className="d-block me-3">Copy</span>
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
                />
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
