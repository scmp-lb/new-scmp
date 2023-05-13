import axiosConf from "../../axiosConf";

//Login user
const login = async (userData) => {
  try {
    const response = await axiosConf.post(
      "/user/login",
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    localStorage.setItem("tokenjjjjhjdgdjfgg", response.data.token);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const authService = { login };
export default authService;
