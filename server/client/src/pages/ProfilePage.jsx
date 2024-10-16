import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import AnimeCardContainer from "../components/AnimeCardContainer";
import ProfileCard from "../components/ProfileCard";

function ProfilePage() {
  const { username } = useParams();

  const [profileData, setProfileData] = useState([]);
  const [animeListWithDetails, setAnimeListWithDetails] = useState([]);

  // [] runs only once after initial render
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileResponse = await axios.get(
          `/api/user/${username}/profile`
        );

        setProfileData(profileResponse.data);
      } catch (error) {
        console.error("Error fetching profile data: ", error);
      }
    };

    const fetchAnimeListDetailsData = async () => {
      try {
        const response = await axios.get(
          `/api/user/${username}/animeListWithDetails`
        );
        console.log(response.data);
        setAnimeListWithDetails(response.data);
      } catch (error) {
        console.error("Error fetching anime list data: ", error);
      }
    };

    fetchProfileData();
    fetchAnimeListDetailsData();
  }, []);

  return (
    <>
      {/* ProfileCard component received profileData (profileImage, backgroundImage, bio) and username */}
      <ProfileCard profileData={profileData} username={username} />

      {/* AnimeCardContainer component receives the user's anime list with mal_id, title, and image path */}
      {<AnimeCardContainer animeListWithDetails={animeListWithDetails} />}
    </>
  );
}

export default ProfilePage;
