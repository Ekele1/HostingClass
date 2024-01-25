import { Link, useNavigate } from 'react-router-dom';
import './login.css'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios';
// import { string } from 'yup';
import * as yup from 'yup'

const Login =()=>{
    const navigate = useNavigate()
    const [show, setShow]= useState()
    const [show2, setShow2]= useState(false)
    const [error, setError]= useState(false)

    const [loading, setLoading]= useState(false)

    const schema = yup.object().shape({
        email: yup.string().email().required("Your email is Required"),
        password: yup.string().min(8).max(20).required("Password must be a minimum of 8 Characters"),
    })
    const { register, 
        handleSubmit,
        formState: { errors },
     } = useForm({
         resolver: yupResolver(schema),
         });

    const onSubmit = async (data) => {

        try {
            setLoading(true);
            const res = await axios.post(
                "https://curve-voting-app.onrender.com/login",
                 data
            );
            // console.log(res)
           const userToken =res.data.token
           localStorage.setItem("userToken",(userToken))
          
                navigate("/poll")
        //   console.log(userInformation)
            setLoading(false)
        } catch (err) {
            console.log(err.response.data.message, "err message")
            setShow2(true)
            setError(err.response.data.message, "err message")
            setLoading(false)
        }

    };

    return(
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className='login-wrapper' onSubmit={handleSubmit(onSubmit)}>
                <div className='login-body'>
                    <div className="emailing">
                        <p>email</p>
                        <input type="email" 
                        {...register("email")}
                        />
                    </div>
                    <p className='error'>{errors.email?.message}</p>
                    <div className="emailft">
                        <p>password</p>
                        <div className='email2x'>
                            <input type={show? "text":"password"} {...register("password")}  id='passx'/>
                            {
                                show?<IoMdEye className='show' onClick={()=>setShow(!show)}/>:<IoMdEyeOff className='show' onClick={()=>setShow(!show)}/>
                            }
                        </div>
                        <p className='error'>{errors.password?.message}</p>
                        {
                            show2?<p className='error'>{error}</p>:null
                        }
                    </div>
                    <button className='login'>
                        {
                            loading?"Logingin...":"LOGIN"
                        }
                    </button>
                    <div className="forget">
                        <Link id='forgot' to="/">Don't have an account?</Link>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login