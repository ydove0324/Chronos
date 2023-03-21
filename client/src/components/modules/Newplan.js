import React from "react";
import { useState, useEffect } from "react";
import { post } from "../../utilities";
import "./Newpostinput.css";
/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const NewPostInput = (props) => {
  const [value, setValue] = useState({
    start_time: "",
    end_time: "",
    content: "",
  });
  const [formError, setFormError] = useState("");
  // called whenever the user types in the new post input box
  useEffect(() => {
    if (formError) {
      const timeoutId = setTimeout(() => {
        setFormError("");
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [formError]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value.content.trim() || !value.start_time.trim() || !value.end_time.trim()) {
      setFormError("Please fill in all fields");
      return;
    }
    props.onSubmit && props.onSubmit(value);
    console.log(value);
    setValue({
      start_time: "",
      end_time: "",
      content: "",
    });
    setFormError("");
  };

  return (
    <div className="bottom">
      {formError && <p className="Sentence_container">{formError}</p>}
      <div className="u-flex">
        <input
          type="text"
          placeholder="Enter your plan's start_time"
          name="start_time"
          value={value.start_time}
          onChange={handleChange}
          className="NewPostInput-input"
        />
        <input
          type="text"
          placeholder="Enter your plan's end_time"
          name="end_time"
          value={value.end_time}
          onChange={handleChange}
          className="NewPostInput-input"
        />
        <input
          type="text"
          placeholder="Enter your plan"
          name="content"
          value={value.content}
          onChange={handleChange}
          className="NewPostInput-input"
        />
        <button
          type="submit"
          className="NewPostInput-button u-pointer"
          value="Submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
/**
 *
 * @param {*} props:{empty}
 * @returns
 */
const Newplan = (props) => {
  const addNewplan = ({ start_time, end_time, content }) => {
    const body = {
      start_time: start_time,
      end_time: end_time,
      content: content,
    };
    post("/api/plan", body).then((plan) => {
      console.log(plan);
    });
  };
  return <NewPostInput defaultText="Enter your plan" onSubmit={addNewplan} />;
};
export default Newplan;
