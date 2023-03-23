import React, { useCallback } from "react";
import Newplan from "../modules/Newplan";
import { useState, useEffect } from "react";
import { get } from "../../utilities.js";
import Singleplan from "../modules/Singleplan";
import { socket } from "../../client-socket";
import { DELETE } from "../../utilities";
// import { call } from "file-loader";
/**
 *
 * @param {*} props
 * userId
 *
 */
const handle_delete = (dataId) => {
  const body = {
    data_id: dataId,
  };
  DELETE("/api/plan_delete", body);

  console.log(`delete the date with ${dataId}`);
};
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
    Planlist = planlist.map((singleplan, i) => (
      <Singleplan
        creator_name={singleplan.creator_name}
        start_time={singleplan.start_time}
        end_time={singleplan.end_time}
        plan_content={singleplan.plan_content}
        data_id={singleplan._id}
        handle_delete={handle_delete}
        key={i}
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
