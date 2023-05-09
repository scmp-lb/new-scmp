import React, { useEffect } from "react";
import Department from "../components/department";
import { useSelector, useDispatch } from "react-redux";
import { getDepartments } from "../features/departments/departmentSlice";
import { useLocation } from "react-router-dom";

function Departments() {
  const dispatch = useDispatch();
  const { departments, isLoading } = useSelector((state) => state.departments);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(getDepartments());
  }, []);

  return (
    <>
      <div className="Departments">
        <h1>DEPARTMENTS</h1>
        <div className="department-cards">
          {departments?.department?.length > 0
            ? departments?.department?.map((ele) => {
                return (
                  <Department src={ele?.image?.url} value={ele} key={ele?.id} />
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
}

export default Departments;
