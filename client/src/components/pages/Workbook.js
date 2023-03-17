import React from "react";
import Newplan from "../modules/Newplan";
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
  return (
    <>
      <div>Y_dove's babyroom</div>
      <Newplan />
    </>
  );
};
export default Workbook;
