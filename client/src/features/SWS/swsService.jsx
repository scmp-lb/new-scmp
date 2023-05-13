import axiosConf from "../../axiosConf";
const API_URL = "/sws";

//Get all sws events
const getAllSwSEvents = async () => {
  const response = await axiosConf.get(API_URL);
  return response.data;
};
// Get sws event by id
const getSwsEventById = async (id) => {
  try {
    const response = await axiosConf.get(`/sws/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// Add SWS event
const addSWS = async (swsData) => {
  const response = await axiosConf.post(API_URL, swsData);
  return response;
};

//Delete SWS Event
const deleteEvent = async (eventId) => {
  const response = await axiosConf.delete(API_URL + "/" + eventId);
  return response.data;
};

//Edit SWS Event
const editSWSEvent = async (id, eventData) => {
  const response = await axiosConf.put(API_URL + "/" + id, eventData);
  return response.data;
};

const swsService = {
  getSwsEventById,
  editSWSEvent,
  deleteEvent,
  addSWS,
  getAllSwSEvents,
};
export default swsService;
