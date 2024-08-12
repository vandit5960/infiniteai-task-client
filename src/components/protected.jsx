import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "./stateProvider";

const Protected = ({ children }) => {
  const { user } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);


  return <div>{children}</div>;
};

export default Protected;
