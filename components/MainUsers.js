import { useEffect } from "react";
import { unixToDate } from "../utils";
import { useUser } from "../context/userContext";

export default function MainUsers({ users, apartments, handleBlockUser }) {
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
              <th>Name</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Status</th>
              <th>Registered</th>
              <th>Last login</th>
              <th>Apartments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.mId}>
                <td>{index + 1}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.roles.join(", ")}</td>
                <td>{user.isBlocked ? "Blocked" : "Active"}</td>
                <td>{unixToDate(user.createdAt.seconds)}</td>
                <td>{unixToDate(user.lastLogin.seconds)}</td>
                <td>{getUserApartmentsCount(user.mId)}</td>
                <td>
                  <button
                    onClick={() => handleBlockUser(user.id)}
                    disabled={currentUser.mId === user.mId}
                    className="btn btn-danger min-w-100"
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
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
