import React, { useContext } from "react";
import axios from "axios";

import { UserContext } from "../App";

function HomePage() {
  const { currentUsername } = useContext(UserContext);

  const apiCall = () => {
    axios.get("/api/get").then((response) => {
      console.log(response);
    });
  };

  return (
    <>
      <div>
        {currentUsername ? (
          <h1>Welcome {currentUsername}</h1>
        ) : (
          <h1>Welcome</h1>
        )}
        <button onClick={apiCall}>Make API Call</button>
      </div>
    </>
  );
}

export default HomePage;
