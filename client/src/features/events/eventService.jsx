import axiosConf from "../../axiosConf";
const API_URL = "/event";

//Get all Events
const getEvents = async () => {
  const response = await axiosConf.get(API_URL);
  return response.data;
};

// Add Event
const addEvent = async (eventData) => {
  const response = await axiosConf.post(API_URL, eventData);
  return response;
};
// Delete Event
const deleteEvent = async (eventId) => {
  const response = await axiosConf.delete(API_URL + "/" + eventId);
  return response.data;
};
//Edit event
const editEvent = async (eventId, eventData) => {
  const response = await axiosConf.put(API_URL + "/" + eventId, eventData);
  return response.data;
};

const eventService = { addEvent, getEvents, deleteEvent, editEvent };
export default eventService;
