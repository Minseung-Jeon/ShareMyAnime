import React, { useState } from "react";

import axios from "axios";

import AnimeCardContainer from "./AnimeCardContainer";

import styles from "./SearchBar.module.css";

function searchBar() {
  const [searchText, setSearchText] = useState("");
  const [animeListData, setAnimeListData] = useState([]);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchClick = async () => {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${searchText}`
    );
    console.log(response.data);
    setAnimeListData(response.data.data);
  };

  return (
    <>
      <div className={styles.searchBarContainer}>
        <p>What anime are you watching?</p>
        <div className={styles.searchInputContainer}>
          <input
            className={styles.searchInput}
            type="text"
            name="`searchText`"
            value={searchText}
            onChange={handleInputChange}
            //if use press enter key, then also search
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearchClick();
              }
            }}
          />
          <button onClick={handleSearchClick} className={styles.searchButton}>
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>

      <AnimeCardContainer animeListWithDetails={animeListData} />
    </>
  );
}

export default searchBar;
