// How profile is displayed


import { Link } from "react-router-dom";

export default function UserProfile({
  _id,
  username,
  role,
  skills,
  interests,
  picture,
}) {
  console.log("Picture URL:", picture);
  return (
    <div className="card">
      {/* Top half of the card */}
      <div className="card-top">
        <div className="card-text">
          <Link to={`/profile/${_id}`}>
            <h2>{username}</h2>
            <h3>{role}</h3>
          </Link>
        </div>
        <div className="card-image">
          <Link to={`/profile/${_id}`}>
            <img
              src={`https://mentormatch-backend-hhausvlg9-diyas-projects-723f1dff.vercel.app/${picture}`}
              alt={`${username}'s profile`}
            />
          </Link>
        </div>
      </div>
      <div className="card-bottom">
        <p className="match-detail">
          <strong>Skills:</strong>{" "}
          {skills.length > 0 ? skills.join(", ") : "No skills provided"}
        </p>
        <p className="match-detail">
          <strong>Interests:</strong>{" "}
          {interests.length > 0
            ? interests.join(", ")
            : "No interests provided"}
        </p>
      </div>
    </div>
  );
}
