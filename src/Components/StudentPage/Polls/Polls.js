import React, { useState, useEffect } from "react";
import Toast from 'react-bootstrap/Toast'
import Spinner from 'react-bootstrap/Spinner'
import "./polls.css";
import { URL } from '../../URL'

import PollInstance from './PollInstance'
import PollInstancePending from './PollInstancePending'

export default function Polls() {
  const [pendingPolls, setPendingPolls] = useState([]);
  const [participatedPolls, setParticipatedPolls] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [showLoadingToast, setShowLoadingToast] = useState(false);

  const [noPendingPolls, setNoPendingPolls] = useState(false);
  const [noParticipatedPolls, setNoParticipatedPolls] = useState(false);


  useEffect(() => {
    async function fetchData() {
      setShowLoadingToast(true);
      let polls_session;
      try {
        const response = await fetch(`${URL}/fetchpolls`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ courseCode: sessionStorage.getItem('courseCode') })
        });

        const data = await response.json();
        setShowLoadingToast(false);

        polls_session = data?.info.polls;
        // save the fetched data in session
        sessionStorage.setItem('polls', JSON.stringify(data?.info.polls));
      }
      catch (error) {
        console.log(error.message)
      }
      // make sure the active page on  the floating nav is the Attendance page
      localStorage.setItem('currentPage', 'P');

      const indexNumber = JSON.parse(sessionStorage.getItem("indexNumber"));

      let tempParticipatedPolls = [];
      let tempPendingPolls = [];

      polls_session?.map((pollObj) => {
        let match = pollObj.participants.find((index) => index === indexNumber);
        if (match) {
          tempParticipatedPolls.push(
            <PollInstance key={pollObj._id}
              title={pollObj?.title}
              totalVotesCast={pollObj?.totalVotesCast}
              options={pollObj.options}
            />
          );
          setParticipatedPolls(prev => [...tempParticipatedPolls]);

        } else {
          tempPendingPolls.push(
            <PollInstancePending key={pollObj._id}
              pollId={pollObj._id}
              title={pollObj?.title}
              totalVotesCast={pollObj?.totalVotesCast}
              options={pollObj.options}
              setRefresh={setRefresh}
            />
          );
          setPendingPolls(prev => [...tempPendingPolls]);

        }
      });
    }

    fetchData();

  }, [refresh]);

  useEffect(() => {
    if (pendingPolls.length === 0) {
      setNoPendingPolls(true)
    }
    else {
      setNoPendingPolls(false)
    }
    if (participatedPolls.length === 0) {
      setNoParticipatedPolls(true)
    }
    else {
      setNoParticipatedPolls(false)
    }
  }, [pendingPolls, participatedPolls])

  return (
    <div className="student_polls">
      <div className='course-info'>
        {sessionStorage.getItem('courseCode')}: {sessionStorage.getItem('courseName')}
      </div>

      <div className='pending_and_participated_polls_container'>
        <div className="pending_polls">
          <div className="pending_polls_title">Pending Polls</div>
          <div className="pending_polls_body">
            {
              noPendingPolls ?
                <div className="no_pending_polls_message">You have no pending polls</div>
                :
                <div>{pendingPolls}</div>
            }
          </div>
        </div>
        <div className="participated_polls">
          <div className="participated_polls_title">Participated Polls</div>
          <div className="participated_polls_body">
            {
              noParticipatedPolls ?
                <div className="no_participated_polls_message">You have no participated polls</div>
                :
                <div>{participatedPolls}</div>
            }
          </div>
        </div>
      </div>

      {/* loading toast */}
      <Toast show={showLoadingToast}
        onClose={() => setShowLoadingToast(false)}
        bg='secondary'
        className='loading_toast'
      >
        <Toast.Body>
          <Spinner className='spinner'
            animation='border'
            size='md'
          />
        </Toast.Body>
      </Toast>

    </div>
  );
}
