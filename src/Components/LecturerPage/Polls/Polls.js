import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FormLabel from "react-bootstrap/FormLabel";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import Spinner from "react-bootstrap/Spinner";
import { v4 } from 'uuid'
import './polls.css'

import PollInstance from './PollInstance'

import { URL } from '../../URL'

export default function Polls() {

    const [showModal, setShowModal] = useState(false)
    const [showLoadingToast, setShowLoadingToast] = useState(false)
    const [showMessageToast, setShowMessageToast] = useState(false)
    const [message, setMessage] = useState('')
    const [toastVariant, setToastVariant] = useState('success')

    const [polls, setPolls] = useState([])
    const [noCreatedPolls, setNoCreatedPolls] = useState([])

    const [optionsCount, setOptionsCount] = useState(0)

    const [options, setOptions] = useState([])

    useEffect(async () => {
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
            console.log('ata.pols: ', polls_session)
            // save the fetched data in session
            sessionStorage.setItem('polls', JSON.stringify(data?.info.polls));
        }
        catch (error) {
            console.log(error.message)
        }
        // make sure the active page on  the floating nav is the Attendance page
        localStorage.setItem('currentPage', 'P');

        // if there are no created polls, set noCreatedPolls to true and display no polls message
        if (polls_session?.length === 0) {
            setNoCreatedPolls(true)
        }
        else {
            setPolls(polls_session?.map((pollObj, index) => {
                return (
                    <PollInstance key={index}
                        pollId={pollObj._id}
                        title={pollObj?.title}
                        totalVotesCast={pollObj?.totalVotesCast}
                        options={pollObj.options}
                        deletePoll={deletePoll}
                    />
                )
            }))
        }

    }, [])

    // do not display the no created polls message if a poll has been created
    useEffect(() => {
        if (polls?.length > 0) setNoCreatedPolls(false);
        else setNoCreatedPolls(true);
    }, [polls])

    // adds one option to the list of poll options => 10 options maximum
    function addOption() {
        if (optionsCount === 10) {
            console.log('up to 10')
            return;
        }
        let tempOps = options;
        // initially add two options
        if (optionsCount === 0) {
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
            if (e.target.className.split(' ')[1] !== op.key) return true;
            else return false;
        }))
        setOptionsCount(prevCount => prevCount - 1);
    }
    // end

    async function createPoll() {
        let title = document.querySelector('#title').value;
        // get the array of option input fields
        let optionInputs = Array.from(document.querySelectorAll('.option_input'))
        // get the values of those fields
        let optionInputsVals = optionInputs.map(op => op.value);
        // find any field with a null value and cast to either [true] or [false]
        let containsNullVal = optionInputsVals.find(val => val === '') === '';
        // check for nulls
        if (!title || containsNullVal || optionInputs.length === 0 || optionInputs.length === 1) return; 

        setOptions([]); setOptionsCount(0);

        //  if title and all options are provided, create a poll object
        let options = optionInputs.map(op => new Object({ option: op.value, votes: 0 }));

        setShowModal(false);
        setShowLoadingToast(true);
        document.querySelector('.create_poll_btn').disabled = true;

        const courseCode = sessionStorage.getItem('courseCode');
        // post poll details to server
        try {
            const response = await fetch(`${URL}/addpoll`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    title: title,
                    options: options,
                    courseCode: courseCode
                })
            });

            const data = await response.json();
            setShowLoadingToast(false);
            // add created poll to array of poll instances
            if (data.polls) {
                // sessionStorage.setItem('polls', data.polls)
                setPolls(prev => [...data.polls.map((pollObj, index) => {
                    return (
                        <PollInstance key={index}
                            pollId={pollObj._id}
                            title={pollObj?.title}
                            totalVotesCast={pollObj?.totalVotesCast}
                            options={pollObj.options}
                            deletePoll={deletePoll}
                        />
                    )
                })]);
                setToastVariant('success');
                setMessage('Poll created successfully !');
            }
            else {
                setToastVariant('danger');
                setMessage('Could not create poll. Please try again !');
            }
            setShowMessageToast(true);
            document.querySelector('.create_poll_btn').disabled = false;

        } catch (error) {
            console.log(error.message);
        }

    }
    // end create poll

    async function deletePoll(pollId) {
        setShowLoadingToast(true);
        setShowModal(false);

        // api call to remove poll from database
        try {
            const courseCode = sessionStorage.getItem('courseCode');
            const courseName = sessionStorage.getItem('courseName');
            const response = await fetch(`${URL}/deletepoll`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    pollId: pollId,
                    courseCode: courseCode
                })
            });

            const data = await response.json();
            if (data.successful) {
                setShowLoadingToast(false);
                setMessage('Poll deleted successfully !');
                setToastVariant('success');
                // if updates are successfully applied on the database, filter the local polls
                setPolls(prevPolls => [...prevPolls.filter(poll => {
                    if (poll.props.pollId != pollId) { console.log('match'); return true; }
                    else { console.log('no match'); return false; }
                })]);
            }
            else {
                setMessage('Could not apply updates !')
                setToastVariant('danger')
            }
            setShowMessageToast(true);

        } catch (error) {
            console.log(error.message);
        }

        console.log('poll length: ', polls.length)

    }
    // end delete poll

    return (
        <div className='lecturer_polls'>
            <div className='course-info'>
                {sessionStorage.getItem('courseCode')}: {sessionStorage.getItem('courseName')}
            </div>
            <div className='create_polls_header'>
                <div><Button className='create_poll_btn'
                    onClick={() => { addOption(); setShowModal(true) }}>Create Poll</Button></div>
                <div className='total_polls'>Total Polls: {polls?.length}</div>
            </div>
            <div className='created_polls'>
                {
                    noCreatedPolls ?
                        <div className='no_polls_message'>No polls have been created for this course</div>
                        :
                        <div className='created_polls_container'>{polls}</div>
                }
            </div>

            {/* loading toast */}
            <Toast show={showLoadingToast}
                onClose={() => setShowLoadingToast(false)}
                className='loading_toast'
                bg='secondary'
            >
                <Toast.Body>
                    <Spinner className='spinner'
                        animation='border'
                        size='md'
                    />
                </Toast.Body>
            </Toast>

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

            {/* poll  creation modal */}
            <Modal onHide={() => setShowModal(false)}
                show={showModal}
                backdrop='static'
                id='modal'
            >
                <Modal.Body>
                    <div id='modal_header'>
                        <span style={{ color: 'rgb(163, 23, 140)' }}>Poll</span>
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
                            <Button className='confirm_btn' onClick={createPoll}>Confirm</Button>
                            {/* {showSpinner ? <Spinner /> : ''} */}
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </div>
    )
}


