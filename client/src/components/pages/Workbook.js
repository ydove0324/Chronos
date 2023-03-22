import React from "react";
import Newplan from "../modules/Newplan";
import { useState, useEffect } from "react";
import { get } from "../../utilities.js";
/**
 *
 * @param {*} props
 * userId
 *
 */
const Workbook = (props) => {
  if (!props.userId) {
    return <div>Log in before use the Workbook</div>;
  }
  const [planlist, setplanlist] = useState({});
  const load_history = () => {
    get("/api/plan").then((data) => {
      setplanlist(data);
    });
  };
  useEffect(() => {
    load_history();
  }, []);
  return (
    <>
      <div>Y_dove's babyroom</div>
      <Newplan />
    </>
  );
};
export default Workbook;
