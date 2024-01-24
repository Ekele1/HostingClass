import './result.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Result = () => {
    const [question, setQuestion] = useState("")
    const [response, setResponse] = useState([])
    const [vote, setVote] = useState([])
    const fetchQuestion = async () => {
        try {
            const id = localStorage.getItem("pollid")
            const url = `https://curve-voting-app.onrender.com/api/polls/${id}`
            const response = await axios.get(url)
            setResponse(response?.data.options)
            setQuestion(response?.data.question)
            setVote(response.data.votes)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchQuestion();
    }, [])

    useEffect(() => {
        console.log(vote);
    }, [vote])
    return (
        <div className="resultwrapper">
            <div className="header headerxxx">
                <div className="svg">
                    <img src="./voteinfo.svg" alt="" />
                    <h1>The Curve Voting App</h1>
                </div>
                <div className="namepro"><i>Create anonymous polls for free</i></div>
            </div>
            <div className="resultname">
                <h2>Topic:</h2> <h2>{question}</h2>
            </div>
            <div className="votecount">
                <div className="optionpoint">
                    {
                        response?.map((e, id) => (
                            <div className="thepoint" key={id}>
                                <h2>{e.text}</h2>
                                {
                                    vote?.map((e) => {
                                        <h2>{e} votes</h2>
                                    })
                                }
                                <h2></h2>
                            </div>
                        ))
                    }
                </div>
                <div className="optionpoint2">
                    <div className="choicechoose"></div>
                    <div className="total"></div>
                </div>
            </div>
        </div>
    )
}

export default Result