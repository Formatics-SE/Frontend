import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FormLabel from "react-bootstrap/FormLabel";
import Form from "react-bootstrap/Form";
import { v4 } from 'uuid'
import './polls.css'

import PollInstance from './PollInstance'

export default function Polls() {

    const [showModal, setShowModal] = useState(false)
    const [polls, setPolls] = useState([])

    const [optionsCount, setOptionsCount] = useState(0)

    const [options, setOptions] = useState([])

    // adds one option to the list of poll options => 10 options maximum
    function addOption() {
        if (optionsCount === 10) {
            console.log('up to 10')
            return;
        }

        let tempOps = options;

        // initially add two options
        if (optionsCount === 0) {
            console.log('zero')

            for (let i = 0; i < 2; i++) {
                let keyVal = v4()
                tempOps[i] = (
                    <div className='option' key={keyVal}>
                        <Form.Control className='option_input' />
                        <div className={`remove_option_btn ${keyVal}`} onClick={(e) => removeOption(e)}>&times;</div>
                    </div>
                )
            }
            setOptionsCount(2);
        }
        else {
            console.log('not zero')

            let keyVal = v4()
            tempOps.push(
                <div className='option' key={keyVal}>
                    <Form.Control className='option_input' />
                    {/* give the remove option btn a className equivalent to it's container's (options) key value */}
                    <div className={`remove_option_btn ${keyVal}`} onClick={(e) => removeOption(e)}>&times;</div>
                </div>
            )
            setOptionsCount(prevCount => prevCount + 1);
        }

        setOptions(tempOps);

    }
    // end

    //  removes an option from the list of poll options
    function removeOption(e) {
        console.clear()
        if (options.length === 2) return;

        setOptions(ops => ops.filter(op => {
            if (e.target.className.split(' ')[1] !== op.key) {
                console.log('no match');
                return true;
            }
            else {
                console.log('match');
                return false;
            }
        }))
        setOptionsCount(prevCount => prevCount - 1);
    }
    // end

    // confirm poll creation
    function handleConfirm() {
        let title = document.querySelector('#title').value;
        let optionInputs = Array.from(document.querySelectorAll('.option_input'))
        // console.log(optionInputs.map(op => op.value))

        let newPoll = {
            title: title,
            options: optionInputs.map(op => new Object({ option: op.value }))
        }

        // setPolls(newPoll);


        console.log(newPoll)

        // optionInputs.forEach(op => console.log(op.value))

    }
    // end

    useEffect(() => {
        console.log('polls: ', polls)
    }, [polls])

    useEffect(() => {
        // const polls_session = JSON.parse(sessionStorage.getItem('polls')) // array of poll objects
        // console.log('polls_session: ', polls_session)

        // setPolls(polls_session?.map(obj => {
        //     return (
        //         <PollInstance
        //             title={obj?.title}
        //             totalVotesCast={obj?.totalVotesCast}
        //             options={obj.options}
        //         />
        //     )
        // }));

    }, [])

    return (
        <div className='polls'>
            <div className='create_polls_header'>
                <div><Button className='create_poll_btn'
                    onClick={() => { addOption(); setShowModal(true) }}>Create Poll</Button></div>
                <div className='total_polls'>Total Polls: {polls?.length}</div>
            </div>
            <div className='created_polls_container'>
                {polls}
                {/* <PollInstance />
                <PollInstance />
                <PollInstance />
                <PollInstance /> */}
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
                            onClick={() => { setOptions([]); setOptionsCount(0); setShowModal(false) }}
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
                            {options}
                        </div>
                        <div>
                            <Button className='confirm_btn' onClick={handleConfirm}>Confirm</Button>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </div>
    )
}


