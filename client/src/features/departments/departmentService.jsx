import axiosConf from "../../axiosConf";
const API_URL = "/department";

//Get all departments
const getDepartments = async () => {
  const response = await axiosConf.get(API_URL);
  return response.data;
};

// Edit a Department
const editDepartment = async (id, departmentData) => {
  const response = await axiosConf.put(API_URL + "/" + id, departmentData);
  return response.data;
};

//Delete Department
const deleteDepartment = async (departmentId) => {
  const response = await axiosConf.delete(API_URL + "/" + departmentId);
  return response.data;
};

// Add Department
const addDepartment = async (departmentData) => {
  const response = await axiosConf.post(API_URL, departmentData);

  return response;
};

const departmentService = {
  getDepartments,
  addDepartment,
  editDepartment,
  deleteDepartment,
};

export default departmentService;
