import React, { useEffect } from "react";
import Footer from "../components/footer";
import { BiArrowBack } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getDepartmentById,
  reset,
} from "../features/oneDepartment/oneDepartmentSlice";
import { useLocation } from "react-router-dom";

function OneDepartment() {
  const dispatch = useDispatch();
  const params = useParams();

  const { department, isLoading, isError, message } = useSelector(
    (state) => state.department
  );

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(getDepartmentById(params.id));
    console.log(department);
  }, [params.id]);

  return (
    <div className="Spec-Dep">
      <a className="back" href="/Departments">
        <BiArrowBack /> Back
      </a>
      <div className="One-Department">
        <img src={department?.image?.url}></img>
        <div className="dep-text">
          {" "}
          <h1>{department?.title}</h1>
          <p style={{ whiteSpace: "pre-line" }} className="desc">
            {department?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OneDepartment;
