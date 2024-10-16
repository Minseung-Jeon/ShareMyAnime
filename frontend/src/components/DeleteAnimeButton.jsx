import React, { useContext } from "react";
import axios from "axios";

//to get username from App.jsx
import { UserContext } from "../App";

function DeleteAnimeButton({ anime }) {
  const { currentUsername } = useContext(UserContext);

  const handleDeleteFromWatchedList = async () => {
    if (!currentUsername) {
      alert("Please log in first");
      return;
    }
    try {
      const token = localStorage.getItem("token");

      await axios.delete("/api/anime/userAnimeDelete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          username: currentUsername,
          anime_mal_id: anime.mal_id,
        },
      });
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return <button onClick={handleDeleteFromWatchedList}>-</button>;
}

export default DeleteAnimeButton;
