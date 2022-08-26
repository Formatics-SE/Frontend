import React, { useState, useEffect } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import './poll_instance.css'

export default function PollInstance({ title, totalVotesCast, options }) {

    const [options_s, setOptions_s] = useState([]);

    function percentage(votes) {
        return ((votes / 74) * 100).toFixed(2);
    }

    useEffect(() => {
        const testData = [
            {
                option: 'Naruto',
                votes: 24
            },
            {
                option: 'Demon Slayer',
                votes: 32
            },
            {
                option: 'Voltron',
                votes: 18
            }
        ];

        const totalVotesCast = 74
        const ops = testData?.map((obj, index) => {
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
                    <div className='progressbar_fill rounded-pill' style={{width: `${percentage(obj.votes)}%`}}></div>
                </div>
            </>)
        })

        setOptions_s(ops);

    }, [])
    return (
        <div className='poll_instance'>
            <div className='title'>
                {title}
            </div>
            <div className='options'>
                {options_s}
            </div>
            <div className='totalVotesCast'>
                Total votes: <span>{totalVotesCast}</span>
            </div>
        </div>
    )
}

/**
 <div className='votes'>
</div>
<div className='percent_fill'></div>
 */