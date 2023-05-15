import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(-1);
  }, [navigate]);

  return <></>;
}

export default NotFound;
