import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FaTrash } from 'react-icons/fa'
import './poll_instance.css'

export default function PollInstance({ id, title, totalVotesCast, options, deletePoll }) {

    const [options_s, setOptions_s] = useState([]);

    const [showModal, setShowModal] = useState(false);

    function percentage(votes) {
        return ((votes / 74) * 100).toFixed(2);
    }

    useEffect(() => {
        // const testData = [
        //     {
        //         option: 'Naruto',
        //         votes: 24
        //     },
        //     {
        //         option: 'Demon Slayer',
        //         votes: 32
        //     },
        //     {
        //         option: 'Voltron',
        //         votes: 18
        //     }
        // ];

        // const totalVotesCast = 74
        const ops = options?.map((obj, index) => {
            return (<>
                <div className='option_and_percent_votes' key={index}>
                    <div className='option'>
                        {obj.option}
                    </div>
                    <div className='percent_votes'>
                        {percentage(obj.votes)}%
                    </div>
                </div>
                <div className='progressbar rounded-pill' >
                    <div className='progressbar_fill rounded-pill' style={{ width: `${percentage(obj.votes)}%` }}></div>
                </div>
            </>)
        })

        setOptions_s(ops);

    }, [])
    return (
        <div className='poll_instance'>
            <div className='title_and_delete_container'>
                <div className='title'>{title}</div>
                <div><FaTrash className='delete_icon' onClick={() => setShowModal(true)} /></div>
            </div>
            <div className='options'>
                {options_s}
            </div>
            <div className='totalVotesCast'>
                Total votes: <span>{totalVotesCast}</span>
            </div>

            {/* modal to confirm Poll deletion */}
            <Modal onHide={() => setShowModal(false)}
                show={showModal}
                backdrop='static'
                id='modal'
            >
                <Modal.Body>
                    <div id='modal_header'>
                        <span style={{ color: 'rgb(163, 23, 140)' }}>Confirm Delete</span>
                        <Button id='close_btn'
                            onClick={() => { setShowModal(false) }}
                        >
                            &times;
                    </Button>
                    </div>
                    <div id='confirm_text'>Do you want to delete this poll ?</div>
                </Modal.Body>
                <Modal.Footer id='modal_footer'>
                    <Button id='confirm_btn_d' onClick={() => deletePoll(id)}>Confirm</Button>
                    <Button id='cancel_btn_d' onClick={() => setShowModal(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

/**
 <div className='votes'>
</div>
<div className='percent_fill'></div>
 */