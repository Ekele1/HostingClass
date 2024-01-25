import './poll.css'
// import Option from './option'
import { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Poll=()=>{
    
    const [pollQuestion, setPollQuestion]= useState("")
    const [option, setOption] = useState([])
    const [error, setError]= useState({isError: false, type: "", mssg: ""})
    const [loading, setLoading]= useState(false)
    const [show, setShow] = useState(false)
    const [link,setLink] = useState("")

    const handleAddOption=()=>{
        const newOption = [...option, []]
        setOption(newOption)
    }
    const handleChange=(unchangeValue,i)=>{
        const inputData = [...option ]
        inputData [i]= unchangeValue.target.value
        setOption(inputData)
        // console.log(option)
    }

    const handleDelete =(id)=>{
        const deleteOutput = [...option, ]
        deleteOutput.splice(id,1)
        setOption(deleteOutput)
    }

    const handleCreatePoll=(e)=>{
        e.preventDefault()
        setLoading(true)

        if(!pollQuestion){
            setError({isError: true, type: "poll-question", mssg: "you can't leave here empty"})
            setLoading(false)
        }else if(option.length < 2){
            setError({isError: true, type: "option", mssg: "you have to create at least two options"})
            setLoading(false)
        }else if(!option){
            setError({isError: true, type: "notoption", mssg: "you cant leave here empty"})
            setLoading(false)
        }
        else{

            const token = localStorage.getItem("userToken")

            const url = "https://curve-voting-app.onrender.com/api/polls"
            const dataObject = {
                options: option,
                question: pollQuestion,
            };

            const headers = {
                Authorization:`Bearer ${token}`
            }

            // console.log("token",token)
            
            axios.post(url,dataObject,{headers})
            .then((Response)=> {
                setLink(Response.data.link)
                localStorage.setItem("pollid", (Response.data.id))
                // console.log("response",Response)
                setShow(true)
                setLoading(false)
            })
            .catch((error)=>{
                console.log("error",error.response.data.message)
                setError({isError: true, type: "login", mssg: `${error.response.data.message}`})
                // alert(error.response.data.message)
                setLoading(false)
            })
        }
    }

    return(
        <div className='pollwrapper'>
            <div className="header">
                <div className="svg">
                    <img src="./voteinfo.svg" alt="" />
                    <h1>The Curve Voting App</h1>
                </div>
                <div className="namepro"><i>Create anonymous polls for free</i></div>
            </div>
            <div className="createpoll">
                <h1>Create a Poll</h1>
                <p className='fields'>Complete bellow fields to create a poll</p>
                <div className="question">
                    <div className="question1">
                        <div className='errpoll'><h3>Poll Question</h3> {error.isError && error.type === "poll-question"? <p>{error.mssg}</p>: null} </div>
                        <input type="text" id='main-question' value={pollQuestion} onChange={(e)=>setPollQuestion(e.target.value)}  placeholder="what's your favourite TV show?"/>
                    </div>
                </div>
                <div className='errpoll'>{error.isError && error.type === "option"? <p>{error.mssg}</p>: null}</div>
            </div>
            <div className='errpoll errpox'>{error.isError && error.type === "login"? <p>{error.mssg}<Link to="/login">login</Link></p>: null}</div>
            {
                option.map((data,id)=>(
                <div className="option" key={id}>
                    <div className='ophold'>
                        <div className='errpoll'><h3>Option {id+1}</h3>{error.isError && error.type === "notoption"? <p>{error.mssg}</p>: null} </div>
                        <div className="option1">
                            <input type="text" value={data} onChange={(e)=>handleChange(e,id)} placeholder={`option ${id+1}`} id='options' />
                        </div>
                    </div>
                    <button className="delete" onClick={()=>handleDelete(id)}><RiDeleteBin6Line /></button>
                </div>
                ))
            }
            
                {
                    show?
                    <div className="link">
                        <div>
                            <h4>Poll created</h4>
                        </div>
                        <div className="li1">
                            <h3>The link to your poll is</h3>
                            <input id='linkxx' value={link}/>
                        </div>
                        {/* <div className="li2">
                            <h3>The link to manage your poll is</h3>

                            <aside>
                                <IoIosWarning /> <i>Dont share this link with to your paticipants</i>
                            </aside>
                            <div><p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p></div>
                        </div> */}
                        <div className="visit">
                            <Link to="/vote">Visit your poll</Link>
                            {/* <Link to="/admin">Visit admin page</Link> */}
                        </div>
                    </div>:null
                }

                <div className="pollcreate">
                    
                    <button id='addpollbutton' onClick={()=>handleAddOption()}>ADD MULTIPLE OPTIONS</button>
                    <button id='addpollbutton' onClick={handleCreatePoll}>
                        {
                            loading?"CREATING POLL...": "CREATE POLL"
                        }
                    </button>
                </div>

        </div>
    )
}

export default Poll