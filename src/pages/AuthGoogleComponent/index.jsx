import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const AuthGoogleComponent = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get("qwa"), "searchPar");

  React.useEffect(() => {
    // navigate("/");
  }, []);

  return <div>Loading...</div>;
};

export default AuthGoogleComponent;
