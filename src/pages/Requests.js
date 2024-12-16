import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import "./UserPage.css";

export default function RequestPage() {
  const { userInfo } = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userInfo?.id) {
      setLoading(true);
      setError(null); 
      fetch(
        `https://mentormatch-backend-y3wu.onrender.com/api/mentorship/requests?requestor=${userInfo.id}`,
        {
          method: "GET",
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          if (data.requests) {
            setRequests(data.requests);
            console.log("requests", requests[0]);
          } else {
            setRequests([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching requests:", error);
          setError("There was an issue fetching your requests.");
          setLoading(false);
        });
    }
  }, [userInfo?.id]);

  const acceptRequest = (requestId) => {
    fetch(`https://mentormatch-backend-y3wu.onrender.com/api/mentorship/request/accept/${requestId}`, {
      method: "PATCH",
      credentials: "include",
    })
      .then((response) => response.json())
      .then(() => {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === requestId
              ? { ...request, status: "Accepted" }
              : request
          )
        );
      })
      .catch((error) => {
        console.error("Error accepting request:", error);
      });
  };

  const declineRequest = (requestId) => {
    fetch(`https://mentormatch-backend-y3wu.onrender.com/api/mentorship/request/decline/${requestId}`, {
      method: "PATCH",
      credentials: "include",
    })
      .then((response) => response.json())
      .then(() => {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === requestId
              ? { ...request, status: "Declined" }
              : request
          )
        );
      })
      .catch((error) => {
        console.error("Error declining request:", error);
      });
  };

  return (
    <div className="profiles-page">
      <h1>Your Mentorship Requests</h1>
      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>You have no mentorship requests.</p>
      ) : (
        <div className="user-profiles">
          {requests.map((request) => (
            <div key={request._id} className="card">
              <div className="">
                <div className="card-top">
                  <div className="card-image">
                    <img
                      src={
                        request?.requestor?.picture
                          ? `https://mentormatch-backend-y3wu.onrender.com/${request.requestor.picture}`
                          : "https://mentormatch-backend-y3wu.onrender.com/uploads/image.jpg"
                      }
                      alt={`${
                        request?.requestor?.username || "Unknown User"
                      }'s profile`}
                      className="requestor-picture"
                    />
                  </div>

                  <div className="card-text">
                    <h3>{request?.requestor?.username || "Unknown User"}</h3>
                    <h4>{request?.requestor?.role || "No Role Specified"}</h4>
                    <p>Status: {request.status}</p>
                  </div>
                </div>
              </div>

              {request.status === "pending" && (
                <div className="request-actions">
                  <button
                    onClick={() => acceptRequest(request._id)}
                    className="accept-button"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => declineRequest(request._id)}
                    className="decline-button"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
