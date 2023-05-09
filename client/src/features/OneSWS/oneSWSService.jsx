import axios from "axios";

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
const oneSwSService = { getSwsEventById };
export default oneSwSService;
