import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const navigate = useNavigate();
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  // const [role, setRole] = useState("");

  // Fetch user info and role
  // useEffect(() => {
  //   fetch("https://mentormatch-q68gbkzuo-diyas-projects-723f1dff.vercel.app/profile", {
  //     credentials: "include",
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`Error: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((profileInfo) => {
  //       setUserInfo(profileInfo);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user profile:", error);
  //     });
  // }, [setUserInfo]);

  useEffect(() => {
    if (userInfo?.id) {
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
          setRole(profileInfo.role || "");
         
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    } else {
      console.log("userInfo is not available yet");
    }
  }, [userInfo?.id]); 
  

  // Logout function
  async function logout() {
    try {
      await fetch("https://mentormatch-q68gbkzuo-diyas-projects-723f1dff.vercel.app/logout", {
        credentials: "include",
        method: "POST",
      });
      setUserInfo(null);
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  const username = userInfo?.username;
  const userId = userInfo?.id;

  // Toggle navigation menu
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header>
      <Link to="/" className="logo">
        MentorMatch
      </Link>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        {username ? (
          <>
            <Link to="/profiles">People</Link>
            <Link to="/create">Create Post</Link>
            <Link to="/match-making">Match Making</Link>
            {/* {role === "mentor" && <Link to="/requests">Requests</Link>} */}
            <Link to={`/profile/${userId}`}>My Profile</Link>
            <a onClick={logout} style={{ cursor: "pointer" }}>
              Logout
            </a>
          </>
        ) : (
          <Link to="/login" className="login-button">
            Login/Register
          </Link>
        )}
      </nav>
      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        <FontAwesomeIcon icon={faBars} />
      </button>
    </header>
  );
}
