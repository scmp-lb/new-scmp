import React, { useEffect } from "react";
import Department from "../components/department";
import { useSelector, useDispatch } from "react-redux";
import { getDepartments } from "../features/departments/departmentSlice";
import { useLocation } from "react-router-dom";
import Loader from "../components/loader";
function Departments() {
 const dispatch = useDispatch();
 const { departments, isLoading } = useSelector((state) => state.departments);

 const { pathname } = useLocation();

 useEffect(() => {
  window.scrollTo(0, 0);
 }, [pathname, isLoading]);

 useEffect(() => {
  dispatch(getDepartments());
 }, []);

 return (
  <>
   {isLoading ? (
    <div
     style={{
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      height: "100vh",
     }}
    >
     <Loader />
    </div>
   ) : (
    <div className="Departments">
     <h1>Departments</h1>
     <div className="department-cards">
      {departments?.department?.length > 0
       ? departments?.department?.map((ele) => {
          return (
           <div key={ele._id}>
            <Department src={ele?.image?.url} value={ele} />
           </div>
          );
         })
       : ""}
     </div>
    </div>
   )}
  </>
 );
}

export default Departments;
