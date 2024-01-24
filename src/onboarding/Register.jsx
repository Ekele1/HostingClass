import { useNavigate } from 'react-router-dom'
import './register.css'
import { useState } from 'react'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios';
// import { string } from 'yup';
import * as yup from 'yup'

const Register =()=>{
    const navigate = useNavigate()
    
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [errorMessage, setErrormessage] = useState("")
    const [loading, setLoading]= useState(false)


    const schema = yup.object().shape({
        Fullname: yup.string().required("Your fullName is Required"),
        email: yup.string().email().required("Your email is Required"),
        phoneNumber: yup.string().matches(/^\d{11}$/, "phoneNumber must be 11 digits").typeError("phoneNumber must be a number").required("PhoneNumber is required "),
        password: yup.string().min(8).max(20).required("Password must be a minimum of 8 Characters"),
        confirmPassword: yup.string().oneOf([yup.ref("password"),null]),
    })
    const {
        register, 
        handleSubmit,
        formState: { errors },
    } = useForm({
         resolver: yupResolver(schema),
         });

    const onSubmit = async (data) => {

        try {
            setLoading(true);
            const res = await axios.post(
                "https://curve-voting-app.onrender.com/signup",
                 data
            );
            console.log(res)
           const userInformation =res.data.data
           localStorage.setItem("userInformation", JSON.stringify({id:userInformation._id, name:userInformation.userName, email:userInformation.email}))
          
                navigate("/verify")
          console.log(userInformation)
            setLoading(false)
        } catch (err) {
            console.log(err, "err message")
            setErrormessage(err.response.message)
            console.log("error",err.response.message)
            setLoading(false)
        }

    };
    return(
        <form action="" onSubmit={handleSubmit(onSubmit)}>

            <div className='Register-wrapper'>
                <div className='Register-body'>
                    <div className="register">
                        <p>Fullname</p>
                                
                            <input type="text" className='name' 
                            
                            {...register("Fullname")}
                            placeholder='Fullname'/>
                    </div>
                    <p className='error'>{errors.Fullname?.message}</p>
                    <div className="register">
                        <p>Email</p>
                            <input type="email" className='name'
                            {...register("email")}
                            placeholder='email' />
                    </div>
                    <p className='error'>{errors.email?.message}</p>
                    <div className="register">
                        <p>Phone Number</p>
                        <input type="text" className='name'
                        {...register("phoneNumber")}
                        placeholder='phone number'></input>
                    </div>
                    <p className='error'>{errors.phoneNumber?.message}</p>
                    <div className="register">
                        <p>Password</p>
                        <div className='pass'>
                            <input type={show? "text": "password"}
                            {...register("password")}
                            className='name2x' placeholder='password'/>
                            {
                                show?<IoMdEye onClick={()=>setShow(!show)}/>:<IoMdEyeOff onClick={()=>setShow(!show)}/>
                            } 
                            
                        </div>
                        <p className='ppp'>password must contain uppercase, lowercase special character</p>
                    </div>
                    <p className='error'>{errors.password?.message}</p>
                    <div className="register">
                        <p>Confirm Password</p>
                        <div className='pass'>
                            <input type={show2? "text": "password"}
                            {...register("confirmPassword")}
                            className='name2x' placeholder='password'/>
                            {
                                show2?<IoMdEye onClick={()=>setShow2(!show2)}/>:<IoMdEyeOff onClick={()=>setShow2(!show2)}/>
                            } 
                        </div>
                    </div>
                    <p className='error'>{errors.confirmPassword?.message}</p>
                    <button className='register-button' >
                        {
                            loading?"Registering...": "REGISTER"
                        }
                    </button>
                </div>
                {/* <div>already have an account?</div> */}
            </div>
        </form>
    )
}

export default Register