# appointment-management-frontend

This is the React.js frontend for the Appointment Management System. It allows users to view branches, book appointments, see their appointment history, and provides admin and doctor-specific dashboards for enhanced functionality.

Features
User Authentication: Login and registration with JWT-based authentication.
Book Appointments: Choose a branch and available time slots to book an appointment.
Appointment History: View personal appointment history.
Admin Dashboard: View and manage users and appointments.
Doctor Dashboard: View branch-specific appointments.
Responsive Design: Styled with CSS for a clean and intuitive interface.

Project Structure
/src
│── /api
│   └── axiosInstance.js   # Axios configuration with JWT token handling
│── /components
│   ├── AdminDashboard.js  # Admin dashboard for managing users & appointments
│   ├── DoctorDashboard.js # Doctor dashboard for viewing branch-specific appointments
│   ├── UserDashboard.js   # User dashboard for booking & viewing appointments
│   └── Login.js           # User login page
│── /styles
│   └── UserDashboard.css   # CSS for user dashboard
│   └── AdminDashboard.css  # CSS for admin dashboard
│   └── DoctorDashboard.css # CSS for doctor dashboard
│── App.js                 # Main application entry
│── index.js               # Root rendering

Getting Started
1. Prerequisites
Node.js (10.x or above)
npm or yarn
Postman (optional for API testing)

3. Installation
Clone the repository:
git clone https://github.com/erzabytyci/appointment-frontend.git
cd appointment-frontend

Install dependencies:
npm install
or
yarn install

3. Configuration
Create a .env file in the root directory and add the following line:
REACT_APP_API_URL=http://localhost:8080
This ensures the frontend knows where to connect with the backend.

CORS Configuration:
Ensure your backend allows CORS requests from http://localhost:3000.

4. Running the Application
To start the development server:
npm start
The app will be available at:
http://localhost:3000

---Using the Application---

Login or Register:
Use the provided login or registration form to authenticate yourself.

User Dashboard:
Select a branch to book appointments.
View available slots and book an appointment.
See your appointment history and delete appointments if needed.

Admin Dashboard:
View and manage users and appointments.
Delete users and appointments as needed.
Testing the API with Postman (Optional)
Use Postman to send requests to the backend at http://localhost:8080.
Add a JWT token in the headers:
Authorization: Bearer <your_jwt_token>

Doctor Dashboard
Select a branch to view appointments for that branch.
Manage branch-specific appointments.

Technologies Used
React.js – Frontend library
Axios – HTTP client for API requests
CSS – Styling the UI
React Router – Navigation and routing

Deployment
To create a production build:
npm run build
The build folder will contain the optimized code, which you can deploy to any static hosting service.

Contributing
Feel free to open issues or submit pull requests if you'd like to contribute.

License
This project is licensed under the MIT License – see the LICENSE file for details.

