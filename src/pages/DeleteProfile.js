import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import "./EditProfile"

export default function DeleteProfile() {
  const navigate = useNavigate();
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch('https://mentormatch-backend-y3wu.onrender.com/profile', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((userInfo) => {
        if (userInfo) {
          setUserInfo(userInfo);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, [setUserInfo, navigate]);

  async function deleteProfile() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your profile? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      const response = await fetch("https://mentormatch-backend-y3wu.onrender.com/profile", {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        alert("Profile deleted successfully.");
        setUserInfo(null);
        navigate("/");
      } else {
        console.error("Failed to delete profile:", response.status);
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  }

  return (
    <div className="delete-profile">
      <h1>Delete Profile</h1>
      {userInfo ? (
        <div>
          <p>Username: {userInfo.username}</p>
          <p>Are you sure you want to delete your profile?</p>
          <button className= "btn-delete" onClick={deleteProfile}>Delete My Profile</button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
