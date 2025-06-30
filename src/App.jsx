import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { getSession, clearSession } from "./api/users";


// Styled Components
const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 240px;
  background-image: linear-gradient(to bottom right, #4c8df1, #5cc5ef);
  color: white;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
`;

const Content = styled.div`
  margin-left: 240px;
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const SidebarTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
`;

const MenuItem = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  margin: 0.6rem 0;
  cursor: pointer;
  text-align: left;

  &:hover {
    font-weight: bold;
    color: #ffffdd;
  }
`;

// Main App Component
function AppLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const sessionUser = getSession();
    if (!sessionUser) {
      navigate("/");
    } else {
      setUser(sessionUser);
      setRole(sessionUser.role);
    }
  }, [navigate]);

  const handleLogout = () => {
    clearSession();
    navigate("/");
  };

  console.log("User:", user);
  return (
    <AppContainer>


      {role === "admin" && (
        <Sidebar>
        <SidebarTitle>SMART</SidebarTitle>
        <MenuItem onClick={() => navigate("/dashboard")}>Dashboard</MenuItem>
        <MenuItem onClick={() => navigate("/admin/my-classes")}>Class Managements</MenuItem>
        <MenuItem onClick={() => navigate("/timetable")}>Schedule</MenuItem>
        <MenuItem onClick={() => navigate("/admin/messages")}>Messages</MenuItem>
        <MenuItem onClick={() => navigate("/admin/library")}>Digital Library </MenuItem>
        <MenuItem onClick={() => navigate("/admin/bus-tracking")}>Bus Live Tracking</MenuItem>
        <MenuItem onClick={() => navigate("/my-posts")}>My Posts</MenuItem>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Sidebar>
      )}



      {role === "teacher" && (
        <Sidebar>
        <SidebarTitle>SMART</SidebarTitle>
        <MenuItem onClick={() => navigate("/dashboard")}>Dashboard</MenuItem>
        <MenuItem onClick={() => navigate("/my-profile")}>My Profile </MenuItem>
        {role !== "student" && <MenuItem onClick={() => navigate("/my-classes")}>My Classes</MenuItem>}
        <MenuItem onClick={() => navigate("/class-timetable")}>Schedule</MenuItem>
        <MenuItem onClick={() => navigate("/exams-and-lesson-planner")}>Exams and Lesson Planner</MenuItem>
        <MenuItem onClick={() => navigate("/messages")}>Messages</MenuItem>
        <MenuItem onClick={() => navigate("/library")}>Digital Library </MenuItem>
        <MenuItem onClick={() => navigate("/bus-tracking")}>Bus Live Tracking</MenuItem>
        
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Sidebar>
      )}


      {role === "student" && (
        <Sidebar>
        <SidebarTitle>SMART</SidebarTitle>
        <MenuItem onClick={() => navigate("/dashboard")}>Dashboard</MenuItem>
        <MenuItem onClick={() => navigate("/student/my-classes")}>My Class</MenuItem>
        <MenuItem onClick={() => navigate("/messages")}>Messages</MenuItem>
        <MenuItem onClick={() => navigate("/student/fee-status")}>Fee Status</MenuItem>
        <MenuItem onClick={() => navigate("/library")}>Digital Library </MenuItem>
        <MenuItem onClick={() => navigate("/bus-tracking")}>Bus Live Tracking</MenuItem>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Sidebar>
      )} 


      
      <Content>
        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard onLogout={handleLogout} />}
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Content>
    </AppContainer>
  );
}

export default function App() {
  const isLoggedIn = !!getSession();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/*"
          element={isLoggedIn ? <AppLayout /> : <Navigate to="/" />}
        />
        {/* <Route
          path="/my-classes"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        /> */}
      </Routes>
    </Router>
  );
}
