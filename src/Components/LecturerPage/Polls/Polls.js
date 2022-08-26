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

    function removeOption(e) {
        // let tempArray = options.filter((option) => 
        //     option.props.children[1].props.className.split(' ')[1] !=
        //     e.target.className.split(' ')[1]
        // )
        options.forEach((option) => 
        console.log(option.props.children[1].props.className.split(' ')[1]) 
    )

        // setOptions(tempArray)
    }

    // adds two default inputs on refresh or when a poll is being created
    function addFirstTwoOptions() {
        let tempOps = []
        for (let i = 1; i <= 2; i++) {
            tempOps.push(
                <div className='option'>
                    <Form.Control />
                    <div className={`remove_option_btn ${i}`}
                        onClick={(e) => removeOption(e)}>&times;</div>
                </div>
            )
        }
        setOptions(tempOps)
    }

    useEffect(() => {
        addFirstTwoOptions()
    }, [])

   

