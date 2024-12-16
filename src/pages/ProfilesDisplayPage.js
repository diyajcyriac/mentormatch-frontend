import UserProfile from "../UserProfile";
import { useEffect, useState } from "react";
import FilterComponent from "./Filter";

export default function ProfilesDisplayPage() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({});

  const fetchUsers = (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    fetch(`https://mentormatch-backend-hhausvlg9-diyas-projects-723f1dff.vercel.app/users?${query}`)
      .then((response) => response.json())
      .then((users) => setUsers(users));
  };

  useEffect(() => {
    fetchUsers(filters);
  }, [filters]);
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="profiles-page">
      <FilterComponent onApplyFilters={handleApplyFilters} />
      <div className="user-profiles">
        {users.length > 0 &&
          users.map((user) => (
            <UserProfile key={user._id} {...user} />
          ))}
      </div>
    </div>
  );
}
