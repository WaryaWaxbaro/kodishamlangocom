import { useState, useEffect } from "react";

export default function ProfileForm({
  formAction,
  setSaveProfileData,
  profileForm,
  setProfileForm,
}) {
  const [charsCounter, setCharsCounter] = useState(0);

  const handleProfileFormData = (e) => {
    if (e.target.name === "intro") {
      if (e.target.value.length <= 60) {
        setCharsCounter(e.target.value.length);
        setProfileForm({
          ...profileForm,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setProfileForm({
        ...profileForm,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleProfileFormSubmit = (e) => {
    e.preventDefault();
    setSaveProfileData(formAction);
  };
  return (
    <div className="w-100 my-3">
      <form onSubmit={handleProfileFormSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Name"
            value={profileForm.name}
            onChange={handleProfileFormData}
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Title"
            value={profileForm.title}
            onChange={handleProfileFormData}
          />
          <label htmlFor="title">Title</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            placeholder="Phone Number"
            value={profileForm.phone}
            onChange={handleProfileFormData}
          />
          <label htmlFor="phone">Phone Number</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Email"
            value={profileForm.email}
            onChange={handleProfileFormData}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            placeholder="Address"
            value={profileForm.address}
            onChange={handleProfileFormData}
          />
          <label htmlFor="address">Address</label>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="intro">
            Intro
          </label>
          <textarea
            className="form-control"
            placeholder="Introduction text here. Max 60 characters."
            id="intro"
            style={{ height: "100px" }}
            name="intro"
            value={profileForm.intro}
            onChange={handleProfileFormData}
          ></textarea>
          <p>{charsCounter}/60</p>
        </div>
        <div className="text-end">
          <button className="btn btn-success text-light rounded-0">Save</button>
        </div>
      </form>
    </div>
  );
}
