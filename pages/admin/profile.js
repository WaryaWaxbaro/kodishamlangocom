import React from "react";
import ProfileCard from "../../components/ProfileCard";

export default function profile() {
  return (
    <div className="container-lg py-4">
      <div className="max-width-680 mx-auto shadow p-2 p-sm-3 rounded-3">
        <ProfileCard />
        <hr />
        <div className="w-100 py-2 text-end">
          <button className="btn btn-primary">Edit profile</button>
        </div>
      </div>
    </div>
  );
}
