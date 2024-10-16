import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";

//import CSS module
import styles from "./AnimeCard.module.css";

import AddAnimeButton from "./AddAnimeButton";
import DeleteAnimeButton from "./DeleteAnimeButton";

import { UserContext } from "../App";

function AnimeCard({ anime }) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  //fetches the current URL location useLocation hook
  //and checks if the URL contains '/user/' to determine if the user is on a profile page
  const location = useLocation();
  const isProfilePage = location.pathname.includes("/user/");

  return (
    <div
      className={styles.animeCard}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* imagePath for profilepage.jsx image.webp for jikan api search */}
      {anime.imagePath || anime.images.webp.large_image_url ? (
        <img
          className={styles.animeImage}
          src={anime.imagePath || anime.images.webp.large_image_url}
          alt={`${anime.title} poster`}
        />
      ) : (
        <p>no image available</p>
      )}
      <h3 className={styles.animeTitle}>{anime.title}</h3>
      {isHovering &&
        (isProfilePage ? (
          <DeleteAnimeButton anime={anime} />
        ) : (
          <AddAnimeButton anime={anime} />
        ))}
    </div>
  );
}

export default AnimeCard;
