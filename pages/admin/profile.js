import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { db, storage } from "../../firebase/clientApp";
import { collection, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import ProfileCard from "../../components/ProfileCard";
import AdminLayout from "../../layout/AdminLayout";
import ProfileForm from "../../components/ProfileForm";
import { useUser } from "../../context/userContext";
import Loader from "../../components/Loader";

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

  useEffect(() => {
    const getUserProfile = async (profileId) => {
      const profileRef = doc(db, "profiles", profileId);
      const docSnap = await getDoc(profileRef);
      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
        const starsRef = ref(storage, `${currentUser.profileId}`);
        // Get the download URL
        getDownloadURL(starsRef)
          .then((url) => {
            // Insert url into an <img> tag to "download"
            console.log("url", url);
            setPreviewUrl(url);
          })
          .catch((error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/object-not-found":
                // File doesn't exist
                break;
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;

              // ...

              case "storage/unknown":
                // Unknown error occurred, inspect the server response
                break;
            }
          });
      }
      setDataLoading(false);
    };
    if (currentUser?.profileId) {
      console.log("currentUser", currentUser.profileId);
      getUserProfile(currentUser.profileId);
    } else {
      if (!loadingUser) {
        setDataLoading(false);
      }
    }
  }, [loadingUser]);

  useEffect(() => {
    const createProfile = async () => {
      const profile = await addDoc(collection(db, "profiles"), profileForm);
      if (profile.id && currentUser.uid) {
        setUserProfile(profile);
        const userDoc = await updateDoc(
          doc(db, "users", `${currentUser.uid}`),
          {
            profileId: `${profile.id}`,
          }
        );
        router.reload();
      }
    };
    const updateProfile = async () => {
      if (currentUser?.profileId) {
        const docSnap = await updateDoc(
          doc(db, "profiles", `${currentUser.profileId}`),
          profileForm
        );

        if (profileImage) {
          const storageRef = ref(storage, `${currentUser.profileId}`);
          // 'file' comes from the Blob or File API
          uploadBytes(storageRef, profileImage).then((snapshot) => {
            console.log("Uploaded a blob or file!");
            router.reload();
          });
        } else {
          router.reload();
        }
      }
    };

    if (saveProfileData === "new") {
      createProfile();
    }
    if (saveProfileData === "update") {
      updateProfile();
    }
  }, [saveProfileData]);

  const handleProfileEdit = () => {
    setProfileForm(userProfile);
    console.log("userProfile", userProfile);
    setToggleEdit(!toggleEdit);
    toast("Wow so easy!");
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
      <div className="container-lg py-4">
        {dataLoading ? (
          <Loader />
        ) : (
          <div className="max-width-680 mx-auto shadow p-2 p-sm-3 rounded-3">
            {userProfile ? (
              <div className="w-100">
                {toggleEdit ? (
                  <div className="w-100">
                    <div>
                      <ToastContainer />
                    </div>
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
                      previewUrl={previewUrl}
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
