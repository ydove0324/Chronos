import React from "react";

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
  return <div>Y_dove's babyroom</div>;
};
export default Workbook;
