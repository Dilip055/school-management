import React from "react";
import { Route, Routes } from "react-router";
// import Home from './components/Home'
// import Navbar from './components/Navbars'

import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./components/Home";
import StudentList from "./pages/admin/StudentList";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import ManageParents from "./pages/admin/ManageParents";
import ManageClasses from "./pages/admin/ManageClasses";
import ManageEvents from "./pages/admin/ManageEvents";
import StudentDetail from "./pages/admin/StudentDetail";
import ManageTeacher from "./pages/admin/ManageTeacher";
import ManageSubjects from "./pages/admin/ManageSubjects";
import ManageClassRoutine from "./pages/admin/ManageClassRoutine";
import PageNotFound from "./PageNotFound";

import ManageFeeStructure from "./pages/admin/ManageFeeStructure";

import StudentDashboard from "./pages/Student/StudentDashboard";
import ManageAttendence from "./pages/admin/ManageAttendence";
import ManageStudentAttendence from "./pages/Teacher/ManageStudentAttendence";
import Layout from "./Website/Pages/Layout";
import AttencenceView from "./pages/Student/AttencenceView";
import ManageStudyMeterial from "./pages/Teacher/ManageStudyMeterial";
import StudyMeterial from "./pages/Student/StudyMeterial";
import NavigationBar from "./Website/Components/NavigationBar";
import ContectUs from "./Website/Pages/ContectUs";
import GalleryPage from "./Website/Pages/GalleryPage";
import AboutUsPage from "./Website/Pages/AboutUsPage";
import ManageGallery from "./pages/admin/ManageGallery";
import PrivateRoute from "./components/PrivateRoute";
import Unauthorized from "./components/Unauthorized";
import EventView from "./pages/Student/EventView";
import ProfilePage from "./components/ProfilePage";
import ParentDashboard from "./pages/Parent/ParentDashboard";
import StudentInvoices from "./pages/Student/StudentInvoices";
import ManageInvoiceGenerate from "./pages/admin/ManageInvoiceGenerate";
const Routing = () => {
  return (
    <>
      <Routes>
        {/* Auth Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Home />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="student/list" element={<StudentList />} />
          <Route path="student/list/:studentId" element={<StudentDetail />} />
          <Route path="parent/list" element={<ManageParents />} />
          <Route path="classes" element={<ManageClasses />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="teacher/list" element={<ManageTeacher />} />
          <Route path="subject/list" element={<ManageSubjects />} />
          <Route path="classRoutine" element={<ManageClassRoutine />} />
          <Route path="fees/struct" element={<ManageFeeStructure />} />
          <Route path="attendance" element={<ManageAttendence />} />
          <Route path="gallery" element={<ManageGallery />} />
          <Route path="adminprofile" element={<ProfilePage />} />
          <Route path="fees/invoicegenerate" element={<ManageInvoiceGenerate />} />
        </Route>

        <Route
          path="/teacher"
          element={
            <PrivateRoute allowedRoles={["teacher"]}>
              <Home />
            </PrivateRoute>
          }
        >
          <Route index element={<TeacherDashboard />} />
          <Route path="attendence" element={<ManageStudentAttendence />} />
          <Route path="dashboard" element={<ManageAttendence />} />
          <Route path="study" element={<ManageStudyMeterial />} />
          <Route path="teacherprofile" element={<ProfilePage />} />
        </Route>



        <Route
          path="/student/dashboard"
          element={
            <PrivateRoute allowedRoles={["student"]}>
              <Home />
            </PrivateRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="attenanceview" element={<AttencenceView />} />
          <Route path="event" element={<EventView />} />
          <Route path="studyMeterial" element={<StudyMeterial />} />
          <Route path="studentprofile" element={<ProfilePage />} />
          <Route path="fee" element={<StudentInvoices />}/>
        </Route>


 <Route
          path="/parent/dashboard"
          element={
            <PrivateRoute allowedRoles={["parent"]}>
              <Home />
            </PrivateRoute>
          }
        >
          <Route index element={<ParentDashboard />} />
          <Route path="parentprofile" element={<ProfilePage/>}/>
          <Route path="events" element={<EventView />}/>
          
        </Route>




        <Route path="/" element={<NavigationBar />}>
          <Route index element={<Layout />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />

          <Route path="/contact" element={<ContectUs />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default Routing;
