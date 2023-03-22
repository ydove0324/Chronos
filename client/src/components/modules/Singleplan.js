import React from "react";
/**
 *
 * @param {*} props
 * creator_name:
 * start_time:
 * end_time:
 * plan_content
 */
import "./Singleplan.css";
const Singleplan = (props) => {
  return (
    <div class="timeline-item">
      <div class="timeline-dates">
        <span class="start-date">{`from ${props.start_time} to ${props.end_time}`}</span>
        {/* <span class="end-date">{props.end_time}</span> */}
      </div>
      <div class="timeline-content">
        <h3 class="username">{props.creator_name}</h3>
        <p>{props.plan_content}</p>
      </div>
    </div>
  );
};
export default Singleplan;
