import axios from "axios";
const API_URL = "http://localhost:5000/api/v1/department";
//Get all departments
const getDepartments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Edit a Department
const editDepartment = async (id, departmentData) => {
  const response = await axios.put(API_URL + "/" + id, departmentData);
  return response.data;
};

//Delete Department
const deleteDepartment = async (departmentId) => {
  const response = await axios.delete(API_URL + "/" + departmentId);
  return response.data;
};

// Add Department
const addDepartment = async (departmentData) => {
  const response = await axios.post(API_URL, departmentData);

  return response;
};

const departmentService = {
  getDepartments,
  addDepartment,
  editDepartment,
  deleteDepartment,
};

export default departmentService;
