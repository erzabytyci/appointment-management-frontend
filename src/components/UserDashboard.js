import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import './UserDashboard.css';

function UserDashboard() {
  const [selectedBranch, setSelectedBranch] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [myAppointments, setMyAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [userId] = useState(1); 
  const [showBookingForm, setShowBookingForm] = useState(false); 

  const branches = [
    'Cardiology', 'Neurology', 'Dermatology', 'Radiology',
    'Pediatrics', 'Orthopedics', 'Psychiatry', 'Gastroenterology'
  ];

  const selectBranch = (branch) => {
    setSelectedBranch(branch);
    setShowBookingForm(true);
    alert(`You selected ${branch}. Now choose a date to book an appointment.`);
  };

  const fetchAvailableSlots = async (date) => {
    setSelectedDate(date);
    try {
      const response = await axiosInstance.get('/api/appointments/available', {
        params: { date },
      });
      setAvailableSlots(response.data);
    } catch (error) {
      console.error('Error fetching available slots:', error);
      alert('Failed to load available slots.');
    }
  };

  const bookAppointment = async (slot) => {
    try {
      const appointmentDate = `${selectedDate}T${slot.split('-')[0]}:00`;

      const appointment = {
        appointmentDate,
        branchOfMedicine: selectedBranch,
        user: { id: userId },
      };

      console.log('Booking appointment with payload:', appointment);

      const response = await axiosInstance.post('/api/appointments', appointment);
      console.log('Appointment booked:', response.data);
      alert('Appointment booked successfully!');

      setSelectedBranch('');
      setAvailableSlots([]);
      setSelectedDate('');
      setShowBookingForm(false);
    } catch (error) {
      console.error('Error booking appointment:', error);

      if (error.response) {
        alert(`Failed to book appointment: ${error.response.data}`);
      } else {
        alert('Failed to book appointment. Please try again.');
      }
    }
  };

  const fetchMyAppointments = async () => {
    try {
      const response = await axiosInstance.get(`/api/appointments/history/${userId}`);
      console.log('My Appointments:', response.data);
      setMyAppointments(response.data);
      setShowHistory(!showHistory); 
    } catch (error) {
      console.error('Error fetching appointment history:', error);
      alert('Failed to load appointment history.');
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      await axiosInstance.delete(`/api/appointments/delete/${appointmentId}`);
      alert('Appointment deleted successfully!');
      fetchMyAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Failed to delete appointment.');
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">APPOINTMENTS</h1>
      </header>

      <h2 className="dashboard-subtitle">Select a branch to book an appointment</h2>

      <div className="branches-container">
        {branches.map((branch, index) => (
          <button
            key={index}
            className="branch-button"
            onClick={() => selectBranch(branch)}
          >
            {branch}
          </button>
        ))}
      </div>

      {showBookingForm && (
        <div className="appointments-section">
          <h3>Selected Branch: {selectedBranch}</h3>
          <h4>Pick a Date to See Available Slots</h4>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => fetchAvailableSlots(e.target.value)}
          />

          {availableSlots.length > 0 && (
            <ul>
              {availableSlots.map((slot, index) => (
                <li key={index}>
                  {slot}{' '}
                  <button onClick={() => bookAppointment(slot)}>Book</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="bottom-container">
        <button onClick={fetchMyAppointments} className="my-appointments-link">
          {showHistory ? 'Hide Appointments' : 'My Appointments'}
        </button>
        <button className="logout-button2">
          <Link to="/login">Log out</Link>
        </button>
      </div>

      {showHistory && (
        <div className="appointments-history">
          <h2>My Appointment History</h2>
          {myAppointments.length > 0 ? (
            <ul>
              {myAppointments.map((appointment) => (
                <li key={appointment.id}>
                  {new Date(appointment.appointmentDate).toLocaleString()} - {appointment.branchOfMedicine}{' '}
                  <button
                    className="delete-button2"
                    onClick={() => deleteAppointment(appointment.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>You have no appointment history.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
