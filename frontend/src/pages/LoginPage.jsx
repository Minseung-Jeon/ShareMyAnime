import React, { useState, useContext } from "react";
import axios from "axios";

import { UserContext } from "../App";

//import component
import TextInput from "../components/TextInput";
import SplitScreenLayout from "../components/SplitScreenLayout";

//import image and styles
import LoginImage from "../assets/KyojoruRengoku.jpg";
import styles from "./LoginCreateAccountPage.module.css";

import { useNavigate } from "react-router-dom";

// to read payload of jwt token
import { jwtDecode } from "jwt-decode";

function LoginPage() {
  const { setCurrentUsername, setToken } = useContext(UserContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
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

    try {
      const response = await axios.post("/api/login", formData);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        if (token) {
          setToken(token);
          const decoded = jwtDecode(token);
          setCurrentUsername(decoded.user.username);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  return (
    <SplitScreenLayout
      leftContent={
        <>
          <h1>Welcome back!</h1>
          <h3>We are excited to see you again!</h3>
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
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              isRequired={true}
            />

            <button type="submit">LOG IN</button>
          </form>
        </>
      }
      rightContent={<img src={LoginImage} alt="Login Image" />}
    />
  );
}

export default LoginPage;
