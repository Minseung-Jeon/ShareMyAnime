import React from "react";
import erasedImage from "../../public/erased.jpg";

//import CSS module
import styles from "./ProfileCard.module.css";

function ProfileCard({ profileData, username }) {
  console.log(profileData);
  return (
    <div className={styles.profileCardContainer}>
      <div className={styles.profileImageContainer}>
        <img
          className={styles.profileImage}
          src={erasedImage} 
          alt="Profile Image"
        />
      </div>

      <div className={styles.userInfo}>
        <h2 className={styles.username}>{username}</h2>
        <p className={styles.bio}>{profileData.bio}</p>
      </div>
    </div>
  );
}

export default ProfileCard;
