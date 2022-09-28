import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Toast from 'react-bootstrap/Toast'
import Spinner from 'react-bootstrap/Spinner'

import "./poll_instance_pending.css";
import { URL } from "../../URL";

export default function PollInstancePending({
  pollId,
  title,
  totalVotesCast,
  options,
  setRefresh,
}) {


  const [options_s, setOptions_s] = useState([]);

  const [showMessageToast, setShowMessageToast] = useState(false);
  const [showLoadingToast, setShowLoadingToast] = useState(false);
  const [message, setMessage] = useState('')
  const [toastVariant, setToastVariant] = useState('success')

  const [optionClicked, setOpitonClicked] = useState(false)

  async function handleClick(e) {
    setShowLoadingToast(true);
    const pollOptionId = e.target.classList[1];
    const courseCode = sessionStorage.getItem('courseCode');

    try {
      const response = await fetch(`${URL}/updatepolls`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          courseCode: courseCode,
          pollId: pollId,
          indexNumber: sessionStorage.getItem("indexNumber"),
          optionId: pollOptionId,
        }),
      });

      const data = await response.json();
      setShowLoadingToast(false);

      if (data.info) {
        // sessionStorage.setItem('polls', JSON.stringify(data?.info.polls));
        // setRefresh((prev) => !prev);
        window.location.reload(true);
      }
    } catch (error) {
      console.log(error.message);
    }

  }

  useEffect(() => {
    const ops = options?.map((obj, index) => {
      return (
        <div key={index} className={`option ${obj._id}`}
          onClick={(e) => {
            if (!optionClicked) {
              setOpitonClicked(true);
              handleClick(e);
            }
          }}
        >
          <div className='option_mark'></div> {obj.option}
        </div>
      )
    });

    setOptions_s(ops);

  }, []);

  return (
    <div className="poll_instance_pending">
      <div className="pending_poll_title">{title}</div>
      <div className="options">{options_s}</div>
      <div className="totalVotesCast">
        Total votes: <span>{totalVotesCast}</span>
      </div>

      {/* message toast */}
      <Toast show={showMessageToast}
        onClose={() => setShowMessageToast(false)}
        bg={toastVariant}
        autohide
        delay={3000}
        className='toast-message'
      >
        <Toast.Body>
          {message}
        </Toast.Body>
      </Toast>

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

