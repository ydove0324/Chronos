import React, { useCallback } from "react";
import Newplan from "../modules/Newplan";
import { useState, useEffect } from "react";
import { get } from "../../utilities.js";
import Singleplan from "../modules/Singleplan";
import { socket } from "../../client-socket";
// import { call } from "file-loader";
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
  const [planlist, setplanlist] = useState([]);
  const load_history = () => {
    get("/api/plan").then((data) => {
      setplanlist(data);
    });
  };
  useEffect(() => {
    load_history();
    const callback = (data) => {
      setplanlist((prevplanlist) => [...prevplanlist, data]);
      // setplanlist(planlist.concat(data));
    };
    socket.on("plan", callback);
    return () => {
      socket.off("plan", callback);
    };
  }, []);
  let Planlist;
  if (planlist.length === 0) {
    Planlist = <div>There is no plan</div>;
  } else {
    Planlist = planlist.map((singleplan) => (
      <Singleplan
        creator_name={singleplan.creator_name}
        start_time={singleplan.start_time}
        end_time={singleplan.end_time}
        plan_content={singleplan.plan_content}
        _id={singleplan._id}
      />
    ));
  }
  // console.log(Planlist);
  return (
    <>
      {Planlist}
      <div>Y_dove's babyroom</div>
      <Newplan />
    </>
  );
};
export default Workbook;
