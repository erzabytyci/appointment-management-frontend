import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance'; 
import './AdminDashboard.css';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const navigate = useNavigate();


  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/api/admin/users');
      setUsers(response.data);
      setShowUsers(true);
      setShowAppointments(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to load users.');
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axiosInstance.get('/api/admin/appointments');
      setAppointments(response.data);
      setShowAppointments(true);
      setShowUsers(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      alert('Failed to load appointments.');
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axiosInstance.delete(`/api/admin/users/${id}`);
        alert('User deleted successfully');
        fetchUsers(); 
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user.');
      }
    }
  };

  const deleteAppointment = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await axiosInstance.delete(`/api/admin/appointments/${id}`);
        alert('Appointment deleted successfully');
        fetchAppointments(); 
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Failed to delete appointment.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <h1 className="title">APPOINTMENTS</h1>
      <div className="buttons-container">
        <button onClick={fetchUsers} className="action-button">VIEW USERS</button>
        <button onClick={fetchAppointments} className="action-button">VIEW APPOINTMENTS</button>
      </div>

      {showUsers && (
        <div className="table-container">
          <h2>All Users</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th> 
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button 
                      onClick={() => deleteUser(user.id)} 
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAppointments && (
        <div className="table-container">
          <h2>All Appointments</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Branch</th>
                <th>User</th>
                <th>Action</th> 
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
                  <td>{appointment.branchOfMedicine}</td>
                  <td>{appointment.user.name}</td>
                  <td>
                    <button 
                      onClick={() => deleteAppointment(appointment.id)} 
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button onClick={handleLogout} className="logout-button">Log out</button>
    </div>
  );
}

export default AdminDashboard;
