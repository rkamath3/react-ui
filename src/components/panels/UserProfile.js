import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaBriefcase, FaCalendar, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: 'John',
    lastName: 'Anderson',
    email: 'john.anderson@nexusanalytics.com',
    phone: '+1 (555) 123-4567',
    department: 'Process Engineering',
    position: 'Senior Process Engineer',
    employeeId: 'NA-2024-001',
    joinDate: '2024-01-15',
    location: 'San Francisco, CA',
    manager: 'Sarah Mitchell',
    skills: 'Process Optimization, Data Analysis, Chemical Engineering, Statistical Modeling',
    bio: 'Experienced process engineer with 8+ years in chemical manufacturing and process optimization. Specializes in data-driven process improvements and root cause analysis.'
  });

  const [editedInfo, setEditedInfo] = useState({ ...userInfo });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedInfo({ ...userInfo });
  };

  const handleSave = () => {
    setUserInfo({ ...editedInfo });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInfo({ ...userInfo });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const InfoField = ({ icon, label, field, type = 'text', readOnly = false }) => {
    const value = isEditing ? editedInfo[field] : userInfo[field];
    
    return (
      <div className="mb-3">
        <label className="form-label d-flex align-items-center gap-2">
          {icon}
          {label}
        </label>
        {type === 'textarea' ? (
          <textarea
            className="form-control"
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            readOnly={!isEditing || readOnly}
            rows={field === 'bio' ? 4 : 2}
          />
        ) : (
          <input
            type={type}
            className="form-control"
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            readOnly={!isEditing || readOnly}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="dashboard-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="card-title">User Profile Information</h3>
          <div className="gap-2 d-flex">
            {!isEditing ? (
              <button className="btn btn-primary" onClick={handleEdit}>
                <FaEdit className="me-2" />
                Edit Profile
              </button>
            ) : (
              <>
                <button className="btn btn-success" onClick={handleSave}>
                  <FaSave className="me-2" />
                  Save Changes
                </button>
                <button className="btn btn-secondary" onClick={handleCancel}>
                  <FaTimes className="me-2" />
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <InfoField
                icon={<FaUser />}
                label="First Name"
                field="firstName"
              />
              
              <InfoField
                icon={<FaUser />}
                label="Last Name"
                field="lastName"
              />
              
              <InfoField
                icon={<FaEnvelope />}
                label="Email Address"
                field="email"
                type="email"
              />
              
              <InfoField
                icon={<FaPhone />}
                label="Phone Number"
                field="phone"
                type="tel"
              />
              
              <InfoField
                icon={<FaBuilding />}
                label="Department"
                field="department"
              />
              
              <InfoField
                icon={<FaBriefcase />}
                label="Position"
                field="position"
              />
            </div>
            
            <div>
              <InfoField
                icon={<FaUser />}
                label="Employee ID"
                field="employeeId"
                readOnly={true}
              />
              
              <InfoField
                icon={<FaCalendar />}
                label="Join Date"
                field="joinDate"
                type="date"
                readOnly={true}
              />
              
              <InfoField
                icon={<FaBuilding />}
                label="Location"
                field="location"
              />
              
              <InfoField
                icon={<FaUser />}
                label="Manager"
                field="manager"
                readOnly={true}
              />
              
              <InfoField
                icon={<FaBriefcase />}
                label="Skills"
                field="skills"
                type="textarea"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <div>
              <InfoField
                icon={<FaUser />}
                label="Bio"
                field="bio"
                type="textarea"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-header">
          <h3 className="card-title">Account Statistics</h3>
        </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="stat-card">
                  <h4 className="text-brand-500 text-2xl font-bold mb-2">247</h4>
                  <p className="text-gray-500">Total Analyses</p>
                </div>
              </div>
              <div>
                <div className="stat-card">
                  <h4 className="text-success-500 text-2xl font-bold mb-2">89%</h4>
                  <p className="text-gray-500">Success Rate</p>
                </div>
              </div>
              <div>
                <div className="stat-card">
                  <h4 className="text-warning-500 text-2xl font-bold mb-2">42</h4>
                  <p className="text-gray-500">Active Projects</p>
                </div>
              </div>
              <div>
                <div className="stat-card">
                  <h4 className="text-brand-600 text-2xl font-bold mb-2">156</h4>
                  <p className="text-gray-500">Hours Saved</p>
                </div>
              </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-header">
          <h3 className="card-title">Recent Activity</h3>
        </div>
        <div className="card-body">
          <div className="activity-list">
            <div className="activity-item d-flex align-items-center mb-3">
              <div className="activity-icon bg-primary text-white rounded-circle me-3">
                <FaUser />
              </div>
              <div>
                <strong>Profile Updated</strong>
                <p className="text-muted mb-0">Updated contact information - 2 hours ago</p>
              </div>
            </div>
            <div className="activity-item d-flex align-items-center mb-3">
              <div className="activity-icon bg-success text-white rounded-circle me-3">
                <FaBriefcase />
              </div>
              <div>
                <strong>Analysis Completed</strong>
                <p className="text-muted mb-0">RCA analysis for Recipe R15 vs R7 - 4 hours ago</p>
              </div>
            </div>
            <div className="activity-item d-flex align-items-center mb-3">
              <div className="activity-icon bg-info text-white rounded-circle me-3">
                <FaCalendar />
              </div>
              <div>
                <strong>Report Generated</strong>
                <p className="text-muted mb-0">Monthly optimization report - 1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
