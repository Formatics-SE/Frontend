import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FormLabel from "react-bootstrap/FormLabel";
import Form from "react-bootstrap/Form";

import './polls.css'
import PollInstance from './PollInstance'

export default function Polls() {

    const [showModal, setShowModal] = useState(false)
    const [polls, setPolls] = useState([])

    const [optionsCount, setOptionsCount] = useState(3)

    const [options, setOptions] = useState([])

    // adds one option to the list of poll options
    function addOption() {
        if (optionsCount === 11) return; // 10 options maximum

        setOptions(prevOps => [...prevOps,
        <div className='option'>
            <Form.Control />
            <div className={`remove_option_btn ${optionsCount}`}
                onClick={(e) => removeOption(e)}>&times;</div>
        </div>
        ]);

        setOptionsCount(prevCount => prevCount + 1);
    }
