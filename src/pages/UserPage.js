import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import "./UserPage.css";

export default function UserPage() {
  const [profileInfo, setProfileInfo] = useState(null); 
  const [requestStatus, setRequestStatus] = useState(null);
  const { id } = useParams();
  const { userInfo } = useContext(UserContext); 
  const [role, setRole] = useState("");

  useEffect(() => {
    if (userInfo?.id) {

      fetch(`https://mentormatch-backend-y3wu.onrender.com/user/${userInfo.id}`, {
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setRole(data.role || "");
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            console.log("Not logged in");
          } else {
            console.error("Error fetching user profile:", error);
          }
        });
    } else {
      console.log("Not logged in yet");
    }
  }, [userInfo?.id]);

  useEffect(() => {
    fetch(`https://mentormatch-backend-y3wu.onrender.com/user/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        return response.json();
      })
      .then((data) => {
        setProfileInfo(data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.log("Not logged in");
        } else {
          console.error("Error fetching user profile:", error);
        }
      });
  }, [id]);

  useEffect(() => {
    if (userInfo?.id && id) {
      fetch(`https://mentormatch-backend-y3wu.onrender.com/api/mentorship/request/status?requestor=${userInfo.id}&acceptor=${id}`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setRequestStatus(null); 
          } else {
            setRequestStatus(data.status); 
            console.log(requestStatus)
          }
        })
        .catch((error) => {
          console.error("Error fetching request status:", error);
        });
    }
  }, [userInfo?.id, id]);

  const sendRequest = () => {
    fetch(`https://mentormatch-backend-y3wu.onrender.com/api/mentorship/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({
        requestor: userInfo.id,
        acceptor: id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send mentorship request");
        }
        return response.json();
      })
      .then(() => {
        alert("Request sent successfully!");
        setRequestStatus("pending"); 
      })
      .catch((error) => {
        console.error("Error sending mentorship request:", error);
        alert("Failed to send request.");
      });
  };

  if (!profileInfo) return null;

  const isRequestDisabled = requestStatus === "pending" || requestStatus === "accepted" || requestStatus === "declined";
  const requestMessage =
    requestStatus === "pending" ? "Request Sent" : requestStatus === "declined" ? "Declined" : requestStatus === "accepted" ? "Request Accepted" : "Send Request";

  const areRolesOpposite = role !== profileInfo.role && role === 'mentee';

  return (
    <div className="profile-container">
      <div className="card">
        <div className="card-top">
          <div className="card-image">
            <img
              src={`https://mentormatch-backend-y3wu.onrender.com/${profileInfo.picture}`}
              alt="Profile"
            />
          </div>
          <div className="card-text">
            <h2>{profileInfo.username}</h2>
            <h3>{profileInfo.role}</h3>
          </div>
          {userInfo?.id === id && (
            <div className="button-container">
              <Link to="/edit/profile" className="Edit-link">
                Edit Profile
              </Link>
              <Link to="/delete/profile" className="Delete-link">
                Delete Profile
              </Link>
            </div>
          )}
        </div>

        {/* Profile Card Body */}
        <div className="card-bottom">
          <p>
            <strong>Bio:</strong> {profileInfo.bio}
          </p>
          <p>
            <strong>Skills:</strong> {profileInfo.skills.join(", ")}
          </p>
          <p>
            <strong>Interests:</strong> {profileInfo.interests.join(", ")}
          </p>
          {areRolesOpposite && (
            <button
              onClick={sendRequest}
              className="send-request-button"
              disabled={isRequestDisabled}
            >
              {requestMessage}
            </button>
          )}
        </div>
      </div>
      <Link to="/profiles" className="back-link">
        See all profiles
      </Link>
    </div>
  );
}
