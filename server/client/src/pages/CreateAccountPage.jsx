import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

//import component
import TextInput from "../components/TextInput";
import SplitScreenLayout from "../components/SplitScreenLayout";

//import image and styles
import CreateAccountImage from "../assets/AllMight.jpeg";
import styles from "./LoginCreateAccountPage.module.css";

function CreateAccountPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("submitted: ", formData);

    try {
      const response = await axios.post("/api/createAccount", formData);

      //alert the message
      alert(response.data.message);

      // if response is successful and user is created, navigate to login page
      if (
        response.status === 200 &&
        response.data.message === "User created successfully. Welcome Aboard!"
      ) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SplitScreenLayout
      leftContent={
        <>
          <h1>Join our service</h1>
          <h3>Create Account for free!</h3>
          <form onSubmit={handleSubmit} className={styles.loginCreateAccountForm}>
            <TextInput
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              isRequired={true}
            />
            <TextInput
              placeholder="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              isRequired={true}
            />
            <TextInput
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              isRequired={true}
            />
            <button type="submit">CREATE ACCOUNT</button>
          </form>
        </>
      }
      rightContent={<img src={CreateAccountImage} alt="Create Account Image" />}
    />
  );
}

export default CreateAccountPage;
