import React, { useState, useEffect } from "react";
import "./polls.css";

import PollInstance from './PollInstance'
import PollInstancePending from './PollInstancePending'

export default function Polls() {
  const [pendingPolls, setPendingPolls] = useState([]);
  const [participatedPolls, setParticipatedPolls] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const polls_session = JSON.parse(sessionStorage.getItem("polls"));
    const indexNumber = JSON.parse(sessionStorage.getItem("indexNumber"));

    polls_session?.map((pollObj) => {
      let match = pollObj.participants.find((index) => index === indexNumber);
      if (match) {
        setParticipatedPolls((prev) => [
          ...prev,
          <PollInstance key={pollObj._id}
            title={pollObj?.title}
            totalVotesCast={pollObj?.totalVotesCast}
            options={pollObj.options}
          />
        ]);
      } else {
        setPendingPolls((prev) => [
          ...prev,
          <PollInstancePending
            key={pollObj._id}
            id={pollObj._id}
            title={pollObj?.title}
            totalVotesCast={pollObj?.totalVotesCast}
            options={pollObj.options}
            setRefresh={setRefresh}
          />
        ]);
      }
    });

    // setPolls(polls_session?.map(obj => {
    //     return (
    //         <PollInstance
    //             title={obj?.title}
    //             totalVotesCast={obj?.totalVotesCast}
    //             options={obj.options}
    //         />
    //     )
    // }));
  }, [refresh]);

  return (
    <div className="student_polls">
      <div className="pending_polls">
        <div className="pending_polls_title">Pending Polls</div>
        <div className="pending_polls_body">{pendingPolls}</div>
      </div>
      <div className="participated_polls">
        <div className="participated_polls_title">Participated Polls</div>
        <div className="participated_polls_body">{participatedPolls}</div>
      </div>
    </div>
  );
}
