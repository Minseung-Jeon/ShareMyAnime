import React, { useState, useContext } from "react";
import axios from "axios";

import TextInput from "../components/TextInput";
import ImageInput from "../components/ImageInput";
import CheckboxInput from "../components/CheckboxInput";
import SearchBar from "../components/SearchBar";

import { UserContext } from "../App";

function PostPage() {
  const { currentUsername } = useContext(UserContext);

  //to store the data that is successfully stored in the database
  const [submittedData, setSubmittedData] = useState("");

  //object with key (title, episode, watchDate)
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    episode: "",
    rate: "",
    completed: false,
  });

  //for image handling
  const handleImage = (event) => {
    console.log(event.target.files);
    setFormData({ ...formData, image: event.target.files[0] });
  };

  //for text input handling
  const handleInputChange = (event) => {
    //destructuring
    const { name, value } = event.target;
    //...formData (spread syntax) to copy existing formData object. avoiding directly mutating state
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckbox = (event) => {
    setFormData({ ...formData, completed: event.target.checked });
  };

  //form submitted when submit button is clicked
  const handleSubmit = (event) => {
    //preventing the default behavior where page gets refreshed (no page reloading)
    //if you don't put this line, page will reload before axios post request is done
    event.preventDefault();
    console.log(currentUsername);
    if (!currentUsername) {
      alert("Please log in first");
      return;
    }

    //FormData() is to create and handle multipart/form-data
    //mutipart/form-data is to combine image data and text data
    const newFormData = new FormData();
    newFormData.append("image", formData.image);
    newFormData.append("title", formData.title);
    newFormData.append("rate", formData.rate);
    newFormData.append("episode", formData.episode);
    newFormData.append("completed", formData.completed);

    const token = localStorage.getItem("token");
    console.log("PostPage Token", token);

    axios
      .post("/api/anime/post", newFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => console.log(response));
    /*       .then((response) => setSubmittedData(response.data));
     */
  };

  //to check what is actually received in useState submittedData
  /* useEffect(() => {
    console.log("effect ", submittedData);
  }, [submittedData]); */

  return (
    <>
      <SearchBar />

      {/* <p>work on manual post styling later</p> */}
      {/* <p>
        <b>Cannot find what you are looking for? Post manually!</b>
      </p>
      <form onSubmit={handleSubmit}>
        <ImageInput
          labelName="Image"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImage}
        />
        <TextInput
          placeholder="Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          isRequired={true}
        />

        <TextInput
          placeholder="Rate"
          type="number"
          name="rate"
          value={formData.rate}
          onChange={handleInputChange}
          isRequired={true}
        />
        <TextInput
          placeholder="Episode"
          type="number"
          name="episode"
          value={formData.episode}
          onChange={handleInputChange}
          isRequired={true}
        />

        <CheckboxInput
          labelName="Completed"
          type="checkbox"
          name="completed"
          value={formData.completed}
          onChange={handleCheckbox}
        />

        <button type="submit">Submit</button>
      </form>
      {submittedData && (
        <div>
          <h2>Submitted Data</h2>
          <p>imagePath: {submittedData.image}</p>
          <img
            src={`http://localhost:5000/${submittedData.imagePath}`}
            alt="anime poster"
          />

          <p>Title: {submittedData.title}</p>
          <p>Episode: {submittedData.episode}</p>
          <p>
            completed: {submittedData.completed ? "completed!" : "watching"}
          </p>
        </div>
      )} */}
    </>
  );
}

export default PostPage;
