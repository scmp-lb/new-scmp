import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
function Loader() {
 return (
  <Box sx={{ display: "flex" }}>
   <CircularProgress sx={{ color: "black" }} size={100} />
  </Box>
 );
}

export default Loader;
