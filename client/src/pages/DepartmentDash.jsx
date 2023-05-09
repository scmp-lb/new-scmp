import React, { useEffect, useState } from "react";
import SideBar from "../components/dashSideBar";
import { useSelector, useDispatch } from "react-redux";
import Department from "../components/department";
import {
  addDepartment,
  getDepartments,
} from "../features/departments/departmentSlice";
function DepartmentDash() {
  const dispatch = useDispatch();

  /* REDUX DEPARTMENTS STATE */
  const { departments } = useSelector((state) => state.departments);

  /* DEFINING ALL STATES */
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  /* GET DEPARTMENTS ON EVERY DISPATCH */
  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  /* ONSUBMIT ADD FUNCTION */
  /* SETTING ALL VALUES IN THE FORMDATA OBJECT */
  const onSubmit = (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.set("description", description);
    formData.set("title", title);
    formData.set("subTitle", subTitle);
    formData.set("image", image);

    dispatch(addDepartment(formData));
    setShowAdd(false);
  };

  return (
    <div className="Dash">
      <div className="overlay" />
      {showAdd && (
        <div className="add-form">
          <form id="myForm" className="form" onSubmit={onSubmit}>
            <div className="Input">
              <input
                type="text"
                placeholder="Title"
                name="Title"
                required
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="Input">
              <input
                type="text"
                placeholder="SubTitle"
                name="SubTitle"
                onChange={(event) => setSubTitle(event.target.value)}
              />
            </div>
            <div className="Input">
              <input
                type="text"
                placeholder="Description"
                name="Description"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                required
              />
            </div>
            <div className="Input">
              <input
                type="file"
                id="image"
                onChange={(e) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (reader.readyState === 2) {
                      setImage(reader.result);
                    }
                  };

                  reader.onerror = (err) => console.log(err);
                  reader.readAsDataURL(e.target.files[0]);
                }}
              />
            </div>
            <div className="crud-buttons">
              <button type="submit"> Add</button>
              <button onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      <div className="sideBar">
        <SideBar />
      </div>

      <div className="dash">
        <h1>Departments</h1>
        <button onClick={() => setShowAdd(true)} className="add-button">
          Add Department
        </button>
        <div className="department-cards">
          {departments?.department?.length > 0
            ? departments?.department?.map((ele, index) => {
                return (
                  <Department src={ele?.image?.url} value={ele} key={ele.id} />
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}

export default DepartmentDash;
