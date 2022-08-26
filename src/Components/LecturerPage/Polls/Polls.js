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

    useEffect(() => {
        // const polls = sessionStorage.getItem('polls') // array of poll objects
        // setPolls(polls)

        // polls?.map(obj => {
        //     return <PollInstance
        //         title={obj?.title}
        //         totalVotesCast={obj?.totalVotesCast}
        //         options={obj.options}
        //     />
        // });

        // <PollInstance
        //     poll = "What's ur favorite anime"
        //     totalVotesCast = '32'
        //     // options = {[{ option: 'Demon Slayer', votes: 23 }, { option: 'One Piece', votes: 10 }]}
        // />

    }, [])

    return (
        <div className='polls'>
            <div className='create_polls_header'>
                <div><Button className='create_poll_btn' onClick={() => { addFirstTwoOptions(); setShowModal(true) }}>Create Poll</Button></div>
                <div className='total_polls'>Total Polls: {polls?.length}</div>
            </div>
            <div className='created_polls_container'>
                <PollInstance />
                <PollInstance />
                <PollInstance />
                <PollInstance />
            </div>

            <Modal onHide={() => setShowModal(false)}
                show={showModal}
                backdrop='static'
                id='modal'
            >
                <Modal.Body>
                    <div id='modal_header'>
                        Poll
                        <Button id='close_btn'
                            onClick={() => { setOptions(); setOptionsCount(2); setShowModal(false) }}
                        >
                            &times;
                        </Button>
                    </div>
                    <div>
                        <div className='field mb-2'>
                            <FormLabel htmlFor='title'>Title</FormLabel>
                            <Form.Control id='title' />
                        </div>
                        <div className='options_label_and_add_options_btn'>
                            <div className='options_label'>Options</div>
                            <div><Button className='add_options_btn' onClick={addOption}>+</Button></div>
                        </div>
                        <div className='options_container'>
                            {
                                options
                            }
                        </div>
                        <div>
                            <Button className='confirm_btn'>Confirm</Button>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </div>
    )
}


function Option() {
    return (
        <div className='option'>
            <div className=''>
                <div className='remove_option_btn'>
                    <Button>&times;</Button>
                </div>
            </div>
        </div>
    )
}


