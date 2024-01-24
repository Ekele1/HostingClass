import { useEffect, useState } from 'react'
import './votepage.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const Votepage=()=>{
    const navigate = useNavigate()
    const { questionId } = useParams();
    
    // const [choose, setChoose] = useState(null)
    const [myOption, setMyoption] = useState("")
    const [question, setQuestion]= useState([])
    const [response, setResponse]= useState([])
    const [email, setEmail]= useState("")
    const [error, setError]= useState(false)
    const [error2, setError2]= useState(false)
    const [loading, setLoading] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [sucessmessage, setSucessMessage] = useState("")
    const [errorMessage, setErroressage] = useState("")


    useEffect(()=>{
        const id = localStorage.getItem("pollid")
        const fetchQuestion = async()=>{    
            try{
                const url = `https://curve-voting-app.onrender.com/api/polls/${id}`
                const response = await axios.get(url)
                setResponse(response?.data.options)
                setQuestion(response?.data.question)
            }catch(error){
                console.log(error)
            }
        }
        fetchQuestion(questionId);
    },[])


    const handleChoose=(e)=>{
        e.preventDefault()
        setLoading(true)
        if(email === ""){
            setError(true)
            setLoading(false)
        }else{
            const id = localStorage.getItem("pollid")
            const url =`https://curve-voting-app.onrender.com/api/polls/${id}/vote`
            const postData = {
                option: myOption,
                email: email,
            }
            axios.post(url, postData)
            .then(response => {
                // console.log(response.data.message)
                setLoading(false)
                setSucess(true)
                setError2(false)
                setSucessMessage(response.data.message)
                setTimeout(()=>{
                    navigate("/acess")
                },[5000])
            })
            .catch(error => {
                console.log(error.response.data.message)
                setError2(true)
                setErroressage(error.response.data.message)
                setLoading(false)
                setSucess(false)
            })
            // console.log("hello")
        }
    }

    
    return(
        <div className='votepagewrapper'>
            <div className="header">
                <div className="svg">
                    <img src="./voteinfo.svg" alt="" />
                    <h1>The Curve Voting App</h1>
                </div>
            </div>
            <div className="first">
                <h1>{question}</h1>
            </div>
            <div className="second">
                <div className='form'>
                    <label className='label'><h3>Input your email to vote your choice</h3></label>

                    <div className='voteremail'>
                        <p>Email</p>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email'/>
                    </div>
                    {
                        sucess?<p className='error' style={{color: "blue"}}>{sucessmessage}</p>:null
                    }
                    {
                        error2?<p className='error'>{errorMessage}</p>:null
                    }
                    {
                        error?<p className='error'>You have to provide an email</p>:null
                    }
                    <select name="vote" id="vote" onChange={(e)=>setMyoption(e.target.value)}>
                        <option value="">Select your option</option>
                        {
                            response?.map((e,id)=>(
                                <option id='option'  key={id} value={e.text}>{e.text}</option>
                            ))
                        }
                        
                    </select>
                    <button id="send" onClick={handleChoose}>
                        {
                            loading?"SENDING...":"SEND"
                        }
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Votepage