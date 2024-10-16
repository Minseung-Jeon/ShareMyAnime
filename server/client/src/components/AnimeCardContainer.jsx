import React, { useState } from "react";

// import components
import AnimeCard from "./AnimeCard";

//import CSS module
import styles from "./AnimeCardContainer.module.css";

function AnimeCardContainer({ animeListWithDetails }) {
  return (
    <div className = {styles.animeCardContainer}>
      <ul>
        {animeListWithDetails.map((anime) => {
          return (
            <li key={anime.mal_id}>
              <AnimeCard anime={anime} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AnimeCardContainer;
