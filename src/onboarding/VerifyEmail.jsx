import { useState } from 'react'
import './forgotpassword.css'
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios';
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';

const VerifyEmail=()=>{
    const navigate = useNavigate()
    const [otperror, setOtpError] = useState({error: false, message: ""})
    const [loading, setLoading]= useState(false)

    const schema = yup.object().shape({
        userInput: yup.string().matches(/^\d{4}$/, "otp must be 4 digits").typeError("otp must be a number").required("otp is required "),
    })

    const {
        register, 
        handleSubmit,
        formState: { errors },
    } = useForm({
         resolver: yupResolver(schema),
         });

        const onSubmit = async (data) => {
            const userId = JSON.parse(localStorage.getItem("userInformation"))
            const newId = userId.id
            // console.log(newId)

            try {
                setLoading(true);
                const res = await axios.post(
                    `https://curve-voting-app.onrender.com/verify/${newId}`,
                    data
                );
                console.log(res)
                const userInformation =res.data.data
                // localStorage.setItem("userInformation", JSON.stringify({id:userInformation._id, name:userInformation.userName, email:userInformation.email}))
                
                    navigate("/login")
                console.log(userInformation)
                setLoading(false)
            } catch (err) {
                console.log(err, "err message")
                setOtpError({error:true, message: err.response.data.message})
                setLoading(false)
            }

        };
    
    return(
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className='passwordWrapper'>
                <div className="passwordbody">
                    <div className="input1">
                        <p>A one time password was sent to your email, pls enter the code bellow</p>
                    </div>
                    <div className="input2">
                        <p>verification code</p>
                        <input type="text" {...register("userInput")} placeholder='enter verification code' />
                    </div>
                    <p className='error'>{errors.userInput?.message}</p>
                    {
                        otperror.error?<p className='error'>{otperror.message}</p>:null
                    }
                    <div className="input2">
                        <button>
                            {
                                loading?"SENDING...":"SEND"
                            }
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default VerifyEmail