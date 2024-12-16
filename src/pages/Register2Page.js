import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function Register2Page() {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [bio, setBio] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (userId) {
      fetch(`https://mentormatch-q68gbkzuo-diyas-projects-723f1dff.vercel.app/profile/${userId}`)
        .then((response) => response.json())
        .then((profileInfo) => {
          setSkills(profileInfo.skills?.join(", ") || "");
          setInterests(profileInfo.interests || "");
          setBio(profileInfo.bio || "");
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setErrorMessage("Error fetching profile data");
        });
    }
  }, [userId]);

  async function updateProfile(ev) {
    ev.preventDefault();

    if (!userId) {
      setErrorMessage("User ID is required");
      return;
    }
    const skillsArray = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");
    const interestsArray = interests
      .split(",")
      .map((interest) => interest.trim())
      .filter((interest) => interest !== "");

    const data = {
      userId,
      skills: skillsArray,
      interests: interestsArray,
      bio,
    };

    try {
      const response = await fetch("https://mentormatch-q68gbkzuo-diyas-projects-723f1dff.vercel.app/register-step-2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 200) {
        alert("Profile updated successfully!");
        navigate("/login");
      } else {
        setErrorMessage(result.error || "Profile update failed");
      }
    } catch (err) {
      setErrorMessage("Error updating profile");
      console.error(err);
    }
  }

  return (
    <form onSubmit={updateProfile} className="login_form">
      <h1>Complete Your Profile</h1>

      <div className="input_box">
        <label htmlFor="skills">Skills</label>
        <input
          type="text"
          id="skills"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(ev) => setSkills(ev.target.value)}
        />
      </div>

      <div className="input_box">
        <label htmlFor="interests">Interests</label>
        <input
          type="text"
          id="interests"
          placeholder="Interests (comma separated)"
          value={interests}
          onChange={(ev) => setInterests(ev.target.value)}
        />
      </div>

      <div className="input_box">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(ev) => setBio(ev.target.value)}
        ></textarea>
      </div>

      <button type="submit">Complete Registration</button>
    </form>
  );
}
