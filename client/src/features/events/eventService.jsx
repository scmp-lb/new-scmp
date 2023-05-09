import axios from "axios";
const API_URL = "http://localhost:5000/api/v1/event";
//Get all Events
const getEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add Event
const addEvent = async (eventData) => {
  const response = await axios.post(API_URL, eventData);
  return response;
};
// Delete Event
const deleteEvent = async (eventId) => {
  const response = await axios.delete(API_URL + "/" + eventId);
  return response.data;
};
//Edit event
const editEvent = async (eventId, eventData) => {
  const response = await axios.put(API_URL + "/" + eventId, eventData);
  return response.data;
};

const eventService = { addEvent, getEvents, deleteEvent, editEvent };
export default eventService;
