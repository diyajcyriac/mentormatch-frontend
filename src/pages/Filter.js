import React, { useState } from "react";
import "./EditProfile.css"

const FilterComponent = ({ onApplyFilters }) => {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");

  const roles = ["", "mentor", "mentee"];

  const handleRoleChange = (value) => {
    setRole(value);
    onApplyFilters({ role: value, skills, interests });
  };

  const handleSkillsChange = (value) => {
    setSkills(value);
    onApplyFilters({ role, skills: value, interests });
  };

  const handleInterestsChange = (value) => {
    setInterests(value);
    onApplyFilters({ role, skills, interests: value });
  };

  return (
    
    <div className="filter-container">
      

      <div className="input-group">
        <label>Role:</label>
        <select value={role} onChange={(e) => handleRoleChange(e.target.value)}>
          {roles.map((roleOption, index) => (
            <option key={index} value={roleOption}>
              {roleOption || "Select Role"}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <label>Skills:</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => handleSkillsChange(e.target.value)}
          placeholder="Search by skills"
        />
      </div>

      <div className="input-group">
        <label>Interests:</label>
        <input
          type="text"
          value={interests}
          onChange={(e) => handleInterestsChange(e.target.value)}
          placeholder="Search by interests"
        />
      </div>
    </div>
  );
};

export default FilterComponent;
