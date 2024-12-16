import React, { useEffect, useState } from "react";
import "./MatchMaking.css";
import { Link } from "react-router-dom";

const MatchMaking = () => {
  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userResponse = await fetch("https://mentormatch-backend-y3wu.onrender.com/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userData = await userResponse.json();
        setUser(userData);

        if (userData && userData.id) {
          const matchResponse = await fetch(
            `https://mentormatch-backend-y3wu.onrender.com/matchmaking?userId=${userData.id}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (!matchResponse.ok) {
            throw new Error("Failed to fetch matches");
          }

          const matchData = await matchResponse.json();
          setMatches(matchData);
        }
      } catch (error) {
        console.error("Error fetching user profile or matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  console.log(matches);

  return (
    <div className="matchmaking-container">
      <h1 className="title">
        Let's find you a {user?.role === "mentee" ? "Mentor" : "Mentee"},{" "}
        {user ? user.username : "Not logged in"}
      </h1>

      {matches.length > 0 ? (
        <div className="matches-list">
          {matches.map(
            (
              {
                id,
                username,
                role,
                skills = [],
                interests = [],
                score,
                matchingInterests,
                matchingSkills,
                picture,
              },
              index
            ) => (
              <div className="match-card" key={username || index}>
                <div className="match-card-header">
                  <Link to={`/profile/${id}`}>
                    <img
                      src={`https://mentormatch-backend-y3wu.onrender.com/${picture}`}
                      alt={`${username}'s profile`}
                      className="match-profile-picture"
                    />
                  </Link>
                  <Link to={`/profile/${id}`}>
                  <div className="match-card-info">
                    <h2 className="match-username">{username}</h2>
                    <p className="match-role">{role}</p>
                  </div>
                  </Link>
                </div>
                <div className="match-details">
                  <p className="match-detail">
                    You have <strong>{score}</strong> skills or interests in
                    common
                  </p>
                  <p className="match-detail">
                    <strong>Skills:</strong>{" "}
                    {skills.length > 0
                      ? skills.join(", ")
                      : "No skills provided"}
                  </p>
                  <p className="match-detail">
                    <strong>Interests:</strong>{" "}
                    {interests.length > 0
                      ? interests.join(", ")
                      : "No interests provided"}
                  </p>
                  <p className="match-detail">
                    <strong>Matching Interests:</strong>{" "}
                    {matchingInterests.length > 0
                      ? matchingInterests.join(", ")
                      : "No matching interests"}
                  </p>
                  <p className="match-detail">
                    <strong>Matching Skills:</strong>{" "}
                    {matchingSkills.length > 0
                      ? matchingSkills.join(", ")
                      : "No matching skills"}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <p className="no-matches">No matches found</p>
      )}
    </div>
  );
};

export default MatchMaking;
