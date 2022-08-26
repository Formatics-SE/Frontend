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

       