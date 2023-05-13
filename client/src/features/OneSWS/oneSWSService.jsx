import axiosConf from "../../axiosConf";

// Get sws event by id
const getSwsEventById = async (id) => {
  try {
    const response = await axiosConf.get(`/sws/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
const oneSwSService = { getSwsEventById };
export default oneSwSService;
