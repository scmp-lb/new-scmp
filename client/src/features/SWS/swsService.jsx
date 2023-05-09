import axios from "axios";
const API_URL = "http://localhost:5000/api/v1/sws";
//Get all sws events
const getAllSwSEvents = async () => {
  const response = await axios.get(API_URL);
  console.log(response.data);
  return response.data;
};
// Get sws event by id
const getSwsEventById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/v1/sws/${id}`);
    console.log("succeeded", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// Add SWS event
const addSWS = async (swsData) => {
  const response = await axios.post(API_URL, swsData);
  return response;
};

//Delete SWS Event
const deleteEvent = async (eventId) => {
  const response = await axios.delete(API_URL + "/" + eventId);
  return response.data;
};

//Edit SWS Event

const editSWSEvent = async (id, eventData) => {
  const response = await axios.put(API_URL + "/" + id, eventData);
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
