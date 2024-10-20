import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import './DoctorDashboard.css';

function DoctorDashboard() {
  const [selectedBranch, setSelectedBranch] = useState('');
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const branches = [
    'Cardiology', 'Neurology', 'Dermatology', 'Radiology',
    'Pediatrics', 'Orthopedics', 'Psychiatry', 'Gastroenterology'
  ];

  const handleBranchClick = async (branch) => {
    setSelectedBranch(branch);
    console.log(`Branch selected: ${branch}`); 
  
    try {
      console.log(`Fetching appointments for branch: ${branch}`);
      const token = localStorage.getItem('token'); 
  
      const response = await axiosInstance.get('/api/appointments/branch', {
        params: { branch },
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      console.log('API Response:', response); 
  
      if (response.status === 200) {
        setAppointments(response.data); 
      } else {
        console.error('Unexpected status code:', response.status);
        alert('Failed to fetch appointments.');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      alert('Error fetching appointments. Check console for details.');
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="doctor-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">APPOINTMENTS</h1>
        <p className="dashboard-subtitle">Choose your branch to see appointments</p>
      </header>

      <div className="branches-container2">
        {branches.map((branch, index) => (
          <button
            key={index}
            className="branch-button"
            onClick={() => handleBranchClick(branch)}
          >
            {branch}
          </button>
        ))}
      </div>

      {selectedBranch && (
        <div className="appointments-section">
          <h2 className="appointments-title">Appointments for {selectedBranch}</h2>
          <div className="appointments-list">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div key={appointment.id} className="appointment-card">
                  <p>Date: {new Date(appointment.appointmentDate).toLocaleString()}</p>
                  <p>User: {appointment.user.name}</p>
                </div>
              ))
            ) : (
              <p>No appointments available for {selectedBranch}.</p>
            )}
          </div>
        </div>
      )}

      <button onClick={handleLogout} className="logout-button3">
        Log out
      </button>
    </div>
  );
}

export default DoctorDashboard;
