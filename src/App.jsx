import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // <-- Added BrowserRouter
import Header from './Header/Header';
import Landing from './Landing/Landing';
import Footer from './Footer/Footer';
import StudentLogin from './Login/StudentLogin';
import StudentDashboard from './StudentDashboard/StudentDashboard';
import AttendanceHistory from './StudentDashboard/AttendanceHistory';
import CampusMap from './StudentDashboard/CampusMap';
import SchedulePanel from './StudentDashboard/SchedulePanel';
import StudentProfile from './StudentDashboard/StudentProfile';
import StaffDashboard from './Staff/StaffDashboard';
import StaffClasses from './Staff/StaffClasses';
import StaffAttendanceLedger from './Staff/StaffAttendanceLedger';
import StaffSchedule from './Staff/StaffSchedule';
import StaffProfile from './Staff/StaffProfile';

function App() {
  return (
    /* Wrapped everything inside BrowserRouter */
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans selection:bg-accent selection:text-white">
       
          {/* Home Route */}
          <Routes>
            <Route path="/"
            element={
              <>
                <Header />
                <Landing />
                <Footer />
              </>
            } />

          {/* Login Route */}
            <Route path="/login"
            element={
              <StudentLogin />
            } />

          {/*Student Dashboard Route */}
            <Route path="/dashboard" 
            element={
              <StudentDashboard />
            } />
          </Routes>

          {/* Attandance Route */}
          <Routes>
            <Route path="/attendance-history" 
            element={
              <AttendanceHistory />
            } />
          </Routes>
      

          {/* Campus Map Route */}
        <Routes>
          <Route path="/campus-map" 
          element={
            <CampusMap />
          } />
        </Routes>

          {/* Schedule Route */}
        <Routes>
          <Route path="/schedule" 
          element={
            <SchedulePanel />
          } />
        </Routes>
          {/* Profile Route */}
        <Routes>
          <Route path="/profile" 
          element={
            <StudentProfile />
          } />
        </Routes>
        

          {/* StaffDashboard Route */}
        <Routes>
          <Route path="/staff-dashboard" 
          element={
            <StaffDashboard />
          } />
        </Routes>

        {/* StaffClasses Route */}
        <Routes>
          <Route path="/staff-classes" 
          element={
            <StaffClasses />
          } />
        </Routes>

          {/* StaffAttendanceLedger Route */}
        <Routes>
          <Route path="/staff-attendance" 
          element={
            <StaffAttendanceLedger />
          } />
        </Routes>
        
          {/* StaffSchedule Route */}
        <Routes>
          <Route path="/staff-schedule" 
          element={
            <StaffSchedule />
          } />
        </Routes>
        
          {/* StaffProfile Route */}
        <Routes>
          <Route path="/staff-profile" 
          element={
            <StaffProfile />
          } />
        </Routes> 
      </div>
    </BrowserRouter>
  );
}

export default App;