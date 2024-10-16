import React, { useState, useEffect, createContext } from "react";

//import App.css (universal)
import "./App.css";

//import CSS module
import styles from "./App.module.css";

//router
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

//component / layout import
import Layout from "./components/Layout";

//page import
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import ListPage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

import { jwtDecode } from "jwt-decode";

//using createContext to pass username to child components
export const UserContext = createContext(null);

function App() {
  const [currentUsername, setCurrentUsername] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  //useEffect runs when token changes
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("decoded: ", decoded);
        setCurrentUsername(decoded.user.username);
      } catch (error) {
        console.error(error);
      }
    }
  }, [token]);

  //logout button
  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUsername(null);
  };

  return (
    /* passing down currentUsername, setCurrentUsername, setToken to child components */
    <UserContext.Provider
      value={{ currentUsername, setCurrentUsername, setToken }}
    >
      <BrowserRouter>
        <div>
          <div style={{ height: "60px" }}>
            <nav className={styles.navBar}>
              <div className={styles.navBarLeft}>
                <ul>
                  {/* NavLink can have the active style class */}
                  {/* <li>
                    <NavLink to="/" className={styles.navLink}>
                      Home Page
                    </NavLink>
                  </li> */}
                  <li>
                    <NavLink to="/" className={styles.navLink}>
                      Post Anime
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink to="/animelist" className={styles.navLink}>
                      Anime List
                    </NavLink>
                  </li> */}
                </ul>
              </div>
              <div className={styles.navBarRight}>
                {currentUsername ? (
                  <>
                    <NavLink to="/">
                      <button onClick={handleLogout}>Log Out</button>
                    </NavLink>

                    <NavLink to={`/user/${currentUsername}`}>
                      <button className={styles.customButtonStyle}>
                        {currentUsername}
                      </button>
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to="/login">
                      <button>Log In</button>
                    </NavLink>
                    <NavLink to="/createAccount">
                      <button className={styles.customButtonStyle}>
                        Create Account
                      </button>
                    </NavLink>
                  </>
                )}
              </div>
            </nav>
          </div>
          <div>
            <Routes>
              {/* <Route path="/" element={<HomePage />} /> */}
              <Route
                path="/"
                element={
                  <Layout>
                    <PostPage />
                  </Layout>
                }
              />
              {/* <Route path="/animelist" element={<ListPage />} /> */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/createAccount" element={<CreateAccountPage />} />
              <Route
                path="/user/:username"
                element={
                  <Layout>
                    <ProfilePage />
                  </Layout>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
