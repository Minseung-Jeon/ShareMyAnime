import React, { useContext } from "react";
import axios from "axios";

//to get username from App.jsx
import { UserContext } from "../App";

function AddAnimeButton({ anime }) {
  const { currentUsername } = useContext(UserContext);

  const handleAddToWatchedList = async () => {
    if (!currentUsername) {
      alert("Please log in first");
      return;
    }
    try {
      const token = localStorage.getItem("token");

      //save anime to user's anime list collection
      await axios.post(
        "/api/anime/userAnimeSave",
        {
          username: currentUsername,
          anime_mal_id: anime.mal_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      //save anime info to anime collection
      await axios.post("/api/anime/mal_post", {
        mal_id: anime.mal_id,
        title: anime.title,
        image_url: anime.images.webp.large_image_url,
      });
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return <button onClick={handleAddToWatchedList}>+</button>;
}

export default AddAnimeButton;
