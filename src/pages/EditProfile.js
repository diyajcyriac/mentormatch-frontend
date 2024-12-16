import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./EditProfile.css";
import { UserContext } from "../UserContext";

export default function EditProfile() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [role, setRole] = useState("");
  const [picture, setPicture] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.id) {
      console.log("Fetching profile for userId:", userInfo.id); // Debug log
      fetch(`https://mentormatch-q68gbkzuo-diyas-projects-723f1dff.vercel.app/user/${userInfo.id}`, {
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        })
        .then((profileInfo) => {
          setUsername(profileInfo.username || "");
          setBio(profileInfo.bio || "");
          setSkills(profileInfo.skills?.join(", ") || "");
          setInterests(profileInfo.interests || "");
          setRole(profileInfo.role || "");
          setPicture(profileInfo.picture || null);
          setLoading(false); 
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setLoading(false);
        });
    } else {
      console.log("userInfo is not available yet");
      setLoading(false);
    }
  }, [userInfo?.id]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  const updateProfile = async (ev) => {
    ev.preventDefault();

    const formData = new FormData();
    formData.set("username", username);
    formData.set("bio", bio);
    formData.set("skills", skills);
    formData.set("interests", interests);
    formData.set("role", role);

    if (picture) {
      formData.set("file", picture);
    }

    const response = await fetch("https://mentormatch-q68gbkzuo-diyas-projects-723f1dff.vercel.app/profile", {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    if (response.ok) {
      alert("Successfully Updated.");
      setRedirect(true);
    } else {
      console.error("Failed to update profile:", response.status);
    }
  };

  const cancelEdit = () => {
    if (userInfo?.id) {
      navigate(`/profile/${userInfo.id}`);
    } else {
      console.error("User ID is not available");
    }
  };


  if (redirect && userInfo?.id) {
    return <Navigate to={`/profile/${userInfo.id}`} />;
  }

  return (
    <div className="edit-profile edit">
      <h1>Edit Profile</h1>
      <form onSubmit={updateProfile} className="form-container">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            placeholder="Write a short bio"
            value={bio}
            onChange={(ev) => setBio(ev.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="skills">Skills</label>
          <input
            type="text"
            id="skills"
            placeholder="Skills (comma separated)"
            value={skills}
            onChange={(ev) => setSkills(ev.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="interests">Interests</label>
          <input
            type="text"
            id="interests"
            placeholder="Interests"
            value={interests}
            onChange={(ev) => setInterests(ev.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(ev) => setRole(ev.target.value)}
          >
            <option value="">Select Role</option>
            <option value="mentor">Mentor</option>
            <option value="mentee">Mentee</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="file">Profile Picture</label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={(ev) => setPicture(ev.target.files[0])}
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn-update">Update Profile</button>
          <button type="button" className="btn-cancel" onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
