import axios from "axios";

//Get a specific department by it's id
const getDepartmentById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/department/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const oneDepartmentService = { getDepartmentById };
export default oneDepartmentService;
