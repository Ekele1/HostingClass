import { useState } from 'react'
import './voteacess.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const VoteAcess =()=>{

    const [otp, setOtp] = useState("")
    const [show, setShow] = useState(false)
    const [error, setError] = useState()
    const [errorMessage, setErrorMessage] = useState("")
    const [sucessMessage, setSucessMessage] = useState("")
    const [success, setSucess] = useState(false)
    const navigate = useNavigate()

    const handleSend=(e)=>{
        e.preventDefault()
        if(!otp){
            setError("you have to provide the otp")
        }else{
            const id = localStorage.getItem("pollid")
            const userInput = otp
            const url = `https://curve-voting-app.onrender.com/api/verify-voters/${id}`

            axios.post(url,userInput)
            .then(Response => {
                // console.log(Response)
                setSucess(true)
                setError(false)
                setTimeout(()=>{
                    navigate("/result")
                },[5000])
            })
            .catch(error => {
                // console.log(error.response.data.message)
                setError(true)
                setSucess(false)
                setErrorMessage(error.response.data.message)
                console.log(typeof otp)
            })
        }
        
    }
    return(
        <div className='otpwrapper'>
            <div className="otpbody">
                <div className="text">
                    <h1>Enter the 4 digit code sent to your email to count your vote</h1>
                </div>
                <input type="text" className='verifybutton' value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder='OTP'/>
                {
                    error?<p style={{color: "red"}}>{errorMessage}</p>:null
                }
                <div className="submitbutton">
                    <button className='submitbutt' onClick={handleSend}>SEND</button>
                </div>
            </div>
        </div>
    )
}

export default VoteAcess