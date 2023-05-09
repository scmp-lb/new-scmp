import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteDepartment,
  getDepartments,
  editDepartment,
} from "../features/departments/departmentSlice";
function Department({ value, src }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* DEFINING ALL STATES */
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [subTitle, setSubTitle] = useState(value.subTitle);
  const [title, setTitle] = useState(value.title);
  const [description, setDescription] = useState(value.description);
  const [image, setImage] = useState(value?.image?.url);

  /*SPECIFIES THE ROUTE */
  const currentLocation = window.location.pathname;

  /* GET DEPARTMENTS ON EVERY DISPATCH */
  useEffect(() => {
    AOS.init();
    dispatch(getDepartments());
    AOS.refresh();
  }, [dispatch]);

  /* ONSUBMIT EDIT FUNCTION */
  /* SETTING ALL VALUES IN THE FORMDATA OBJECT */
  const onSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.set("description", description);
    formData.set("title", title);
    formData.set("subTitle", subTitle);
    formData.set("image", image);

    dispatch(editDepartment({ id: value._id, departmentData: formData }));
    setShowEdit(false);
  };

  /* DELETE FUNCTION */
  const handleDelete = () => {
    dispatch(deleteDepartment(value._id));
    setShowDelete(false);
  };

  /* NAVIGATE FUNCTION BASED ON THE ID */
  const handleClick = () => {
    navigate(`/OneDepartment/${value._id}`);
  };

  return (
    <div data-aos="fade-up" className="Department-card">
      {showEdit && (
        <div className="edit-form">
          <form className="form" onSubmit={onSubmit}>
            <div className="Input">
              <input
                type="text"
                placeholder="Title"
                defaultValue={value.title}
                name="Title"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="Input">
              <input
                type="text"
                placeholder="SubTitle"
                defaultValue={value.subTitle}
                name="SubTitle"
                onChange={(event) => setSubTitle(event.target.value)}
              />
            </div>
            <div className="Input">
              <input
                type="text"
                placeholder="Description"
                defaultValue={value.description}
                name="Description"
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </div>
            <div className="Input">
              <input
                type="file"
                id="image"
                accept="image/png image/jpeg image/jpg image/webp"
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
              <button type="submit"> Edit</button>
              <button onClick={() => setShowEdit(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      {showDelete && (
        <div className="delete-popup">
          <form className="form">
            <h3>Are you sure you want to delete !</h3>

            <div>
              <div className="crud-buttons">
                <button onClick={handleDelete}>Delete</button>
                <button onClick={() => setShowDelete(false)}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      )}
      <img src={src} alt="image" />
      <h2>{value.title}</h2>
      <p>{value.subTitle}</p>
      <p
        className="description"
        style={{
          display: `${currentLocation === "/Departments" ? "none" : "block"}`,
        }}
      >
        {value.description}
      </p>
      <div className="crud-buttons">
        <button
          className="read-more"
          style={{
            display: `${
              currentLocation === "/DepartmentDash" ? "none" : "block"
            }`,
          }}
          onClick={handleClick}
        >
          Read More
        </button>
        <button
          className="Edit"
          style={{
            display: `${currentLocation === "/Departments" ? "none" : "block"}`,
          }}
          onClick={() => setShowEdit(true)}
        >
          Edit
        </button>
        <button
          className="Delete"
          style={{
            display: `${currentLocation === "/Departments" ? "none" : "block"}`,
          }}
          onClick={() => setShowDelete(true)}
        >
          Delete{" "}
        </button>
      </div>
    </div>
  );
}

export default Department;
