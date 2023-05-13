import axiosConf from "../../axiosConf";

//Get a specific department by it's id
const getDepartmentById = async (id) => {
  try {
    const response = await axiosConf.get(
      `/department/${id}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const oneDepartmentService = { getDepartmentById };
export default oneDepartmentService;
