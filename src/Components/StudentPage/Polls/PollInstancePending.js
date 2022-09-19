import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";
import "./poll_instance_pending.css";

import { URL } from "../../URL";

export default function PollInstancePending({
  id,
  title,
  totalVotesCast,
  options,
  deletePoll,
  setRefresh,
}) {
  const [showModal, setShowModal] = useState(false);

  const [options_s, setOptions_s] = useState([]);

  async function handleClick(e) {
    let pollOptionId = e.target.getAttribute("data-attr");
    try {
      const response = await fetch(`${URL}/pollsupdate`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          pollId: id,
          indexNumber: sessionStorage.getItem("indexNumber"),
          optionId: pollOptionId,
        }),
      });

      const data = await response.json();
      if (data.polls) {
        sessionStorage.setItem("polls", data.polls);
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const ops = options?.map((obj, index) => {
      return (
        <>
          <div
            className="pending_option"
            key={obj._id}
            data-attr={obj._id}
            onClick={(e) => handleClick(e)}
          >
            {obj.option}
          </div>
        </>
      );
    });

    setOptions_s(ops);
  }, []);
  return (
    <div className="poll_instance_pending">
      <div className="title_and_delete_container">
        <div className="title">{title}</div>
        <div>
          <FaTrash className="delete_icon" onClick={() => setShowModal(true)} />
        </div>
      </div>
      <div className="options">{options_s}</div>
      <div className="totalVotesCast">
        Total votes: <span>{totalVotesCast}</span>
      </div>

      {/* modal to confirm Poll deletion */}
      <Modal
        onHide={() => setShowModal(false)}
        show={showModal}
        backdrop="static"
        id="modal"
      >
        <Modal.Body>
          <div id="modal_header">
            <span style={{ color: "rgb(163, 23, 140)" }}>Confirm Delete</span>
            <Button
              id="close_btn"
              onClick={() => {
                setShowModal(false);
              }}
            >
              &times;
            </Button>
          </div>
          <div id="confirm_text">Do you want to delete this poll ?</div>
        </Modal.Body>
        <Modal.Footer id="modal_footer">
          <Button id="confirm_btn_d" onClick={() => deletePoll(id)}>
            Confirm
          </Button>
          <Button id="cancel_btn_d" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

/**
 <div className='votes'>
</div>
<div className='percent_fill'></div>
 */