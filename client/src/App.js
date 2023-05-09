import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Departments from "../src/pages/Departments";
import Events from "../src/pages/Events";
import ContactUs from "../src/pages/ContactUs";
import StartUpWeekend from "../src/pages/StartUpWeekend";
import OneDepartment from "./pages/OneDepartment";
import OneEvent from "./pages/OneEvent";
import Footer from "./components/footer";
import EventDash from "./pages/EventDash";
import DepartmentDash from "./pages/DepartmentDash";
import Login from "./pages/Login";
import SWSDash from "./pages/swsDash";
import Nav from "./components/Nav";
import { ProtectedRoute } from "./components/protectedRoute";
import NavBar from "./components/NavBar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
 const currentLocation = window.location.pathname;
 const isAdminRoute =
  currentLocation === "/DepartmentDash" ||
  currentLocation === "/EventsDash" ||
  currentLocation === "/SWSDash" ||
  currentLocation === "/login";
 const blackNav =
  currentLocation === "/OneEvent/:id" ||
  currentLocation === "/OneDepartment/:id";

 return (
  <Router>
   <div className="App">
    {!isAdminRoute && (
     <>
      <div className="nav-desktop">
       <Nav />
      </div>

      <div className="nav-mobile">
       <NavBar />
      </div>
     </>
    )}

    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/Departments" element={<Departments />} />
     <Route path="/Events" element={<Events />} />
     <Route path="/ContactUs" element={<ContactUs />} />
     <Route path="/OneDepartment/:id" element={<OneDepartment />} />
     <Route path="/OneEvent/:id" element={<OneEvent />} />
     <Route path="/login" element={<Login />}></Route>
     <Route path="/StartUpWeekend/:id" element={<StartUpWeekend />} />{" "}
     <Route
      path="/EventsDash"
      element={
       <ProtectedRoute>
        <EventDash />
       </ProtectedRoute>
      }
     />
     <Route
      path="/SWSDash"
      element={
       <ProtectedRoute>
        <SWSDash />
       </ProtectedRoute>
      }
     />
     <Route
      path="/DepartmentDash"
      element={
       <ProtectedRoute>
        <DepartmentDash />
       </ProtectedRoute>
      }
     />
    </Routes>
    {!isAdminRoute && <Footer />}
   </div>
  </Router>
 );
}

export default App;
