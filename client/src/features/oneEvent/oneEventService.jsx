import axiosConf from "../../axiosConf";

//Get a specific event by it's id
const getEventById = async (id) => {
  const response = await axiosConf.get(`/event/${id}`);
  return response.data;
};

const oneEventService = { getEventById };
export default oneEventService;
