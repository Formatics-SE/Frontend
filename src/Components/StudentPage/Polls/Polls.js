import React, { useState, suseEffect } from "react";
import "./polls.css";

export default function Polls() {
  const [pendingPolls, setPendingPolls] = useState([]);
  const [participatedPolls, setParticipatedPolls] = useState([]);

  useEffect(() => {
    const polls_session = JSON.parse(sessionStorage.getItem("polls"));
    const indexNumber = JSON.parse(sessionStorage.getItem("indexNumber"));

    polls_session.map((pollObj) => {
      let match = pollObj.participants.find((index) => index === indexNumber);
      if (match) {
        setParticipatedPolls((prev) => [
          ...prev,
          <PollInstance
            title={pollObj?.title}
            totalVotesCast={pollObj?.totalVotesCast}
            options={pollObj.options}
          />,
        ]);
      }
      else {
        setPendingPolls((prev) => [
            ...prev,
            <PollInstance
              title={pollObj?.title}
              totalVotesCast={pollObj?.totalVotesCast}
              options={pollObj.options}
            />,
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
  }, []);

  return (
    <div className="student_polls">
      <div className="pending_polls">
        <div className="pending_polls_title">Pending Polls</div>
        <div className="pending_polls_body">
            {pendingPolls}
        </div>
      </div>
      <div className="participated_polls">
        <div className="participated_polls_title">Participated Polls</div>
        <div className="participated_polls_body">
            {participatedPolls}
        </div>
      </div>
    </div>
  );
}
