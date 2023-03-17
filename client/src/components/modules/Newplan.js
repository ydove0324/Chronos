import React from "react";
import { useState } from "react";
import { post } from "../../utilities";
/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const NewPostInput = (props) => {
  const [value, setValue] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(value);
    setValue("");
  };

  return (
    <div className="u-flex">
      <input
        type="text"
        placeholder={props.defaultText}
        value={value}
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
  );
};
/**
 *
 * @param {*} props:{empty}
 * @returns
 */
const Newplan = (props) => {
  const addNewplan = (content) => {
    const body = {
      //   start_time: start_time,
      //   end_time: end_time,
      content: content,
    };
    post("/api/plan", body).then((plan) => {
      console.log(plan);
    });
  };
  return <NewPostInput defaultText="Enter your plan" onSubmit={addNewplan} />;
};
export default Newplan;
