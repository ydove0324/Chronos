import React from "react";
/**
 *
 * @param {*} props
 * creator_name:
 * start_time:
 * end_time:
 * plan_content
 * _id
 */
import "./Singleplan.css";
const Singleplan = (props) => {
  return (
    <div className="timeline-item">
      <div className="timeline-dates">
        <span className="start-date">{`from ${props.start_time} to ${props.end_time}`}</span>
        <span class="end-date">{` the id of this data is ${props._id}`}</span>
      </div>
      <div className="timeline-content">
        <h3 className="username">{props.creator_name}</h3>
        <p>{props.plan_content}</p>
      </div>
    </div>
  );
};
export default Singleplan;
