// import { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'
// import { useDispatch, useSelector } from 'react-redux'
// import { register, reset } from '../features/auth/authSlice'
// import { useNavigate } from 'react-router-dom'
// import Spinner from '../components/spinner/Spinner'

// const RegisterPage = ()=>{
//     const [formData,setFormData]=useState({
//         "first_name":"",
//         "last_name":"",
//         "email":"",
//         "password":"",
//         "re_password":"",


//     })

//     const { first_name, last_name, email, password, re_password } = formData

//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

//     const handleChange = (e) => {
//         setFormData((prev) => ({
//             ...prev,
//             [e.target.name]: e.target.value
//         })
//         )
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()


//         if (password !== re_password) {
//             toast.error("Passwords do not match")
//         } else {
//             const userData = {
//                 first_name,
//                 last_name,
//                 email,
//                 password,
//                 re_password
//             }
//             dispatch(register(userData))
//         }
//     }


//     useEffect(() => {
//         if (isError) {
//             toast.error(message)
//         }

//         if (isSuccess || user) {
//             navigate("/")
//             toast.success("An activation email has been sent to your email. Please check your email")
//         }

//         dispatch(reset())

//     }, [isError, isSuccess, user, navigate, dispatch])



//     return(
//       <>
//       <div className="container auth__container">
//           <h1 className="main__title">Register  </h1>

//           {isLoading && <Spinner />}

//           <form className="auth__form">
//               <input type="text"
//                   placeholder="First Name"
//                   name="first_name"
//                   onChange={handleChange}
//                   value={first_name}
//                   required
//               />
//               <input type="text"
//                   placeholder="Last Name"
//                   name="last_name"
//                   onChange={handleChange}
//                   value={last_name}
//                   required
//               />
//               <input type="email"
//                   placeholder="Email"
//                   name="email"
//                   onChange={handleChange}
//                   value={email}
//                   required
//               />
//               <input type="password"
//                   placeholder="Password"
//                   name="password"
//                   onChange={handleChange}
//                   value={password}
//                   required
//               />
//               <input type="password"
//                   placeholder="Retype Password"
//                   name="re_password"
//                   onChange={handleChange}
//                   value={re_password}
//                   required
//               />

//               <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Register</button>
//           </form>
//       </div>
//   </>
//            )

// }
// export default RegisterPage;

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/spinner/Spinner'
import bgImg from './login/images/bg.jpg';
import { BiUser } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'; 
import RegImg from '../assets/reg.jpeg';



const RegisterPage = () => {
    const [formData, setFormData] = useState({
        "first_name": "",
        "last_name": "",
        "email": "",
        "password": "",
        "re_password": "",


    })

    const { first_name, last_name, email, password, re_password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()


        if (password !== re_password) {
            toast.error("Passwords do not match")
        } else {
            const userData = {
                first_name,
                last_name,
                email,
                password,
                re_password
            }
            dispatch(register(userData))
        }
    }


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate("/success-register")
            toast.success("An activation email has been sent to your email. Please check your email")
        }

        dispatch(reset())

    }, [isError, isSuccess, user, navigate, dispatch])

    const divStyle = {
        backgroundImage: `url(${bgImg})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };


    return (
        <>
            <section class="ftco-section m-0">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-6 text-center mb-5">
                            <h1 class="heading-section">Register  <BiUser /> </h1>
                        </div>
                        {isLoading && <Spinner />}
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-md-6 col-lg-4">
                            <div class="login-wrap ">
                                <div class="img "
                                    style={divStyle}
                                ></div>
                                <img src={bgImg} style={{ borderRadius: '50%', width: '200px', height: '200px',    margin: 'auto'
                            }} />
                                <h3 class="text-center mb-0">Welcome</h3>
                                <p class="text-center">Sign up is very easy just minutes</p>
                                <form action="#" class="login-form">
                                    <div class="form-group">
                                            <input type="text" class="form-control"
                                            placeholder="First Name"
                                            name="first_name"
                                            onChange={handleChange}
                                            value={first_name}                                        
                                            required />
                                    </div>
                                    <div class="form-group">
                                            <input type="text" class="form-control"
                                            placeholder="Last Name"
                                                name="last_name"
                                                onChange={handleChange}
                                                value={last_name}
                                                required />
                                    </div>
                                    <div class="form-group">
                                            <input type="email" class="form-control" 
                                            placeholder="Email"
                                            name="email"
                                            onChange={handleChange}
                                            value={email}
                                            required
                                             />
                                        </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" 
                                                placeholder="Password"
                                                name="password"
                                                onChange={handleChange}
                                                value={password}
                                             required         />
                                    </div>
                                    <div class="form-group">
                                    <input type="password" class="form-control"
                                    placeholder="Retype Password"
                                    name="re_password"
                                    onChange={handleChange}
                                    value={re_password}
                                    required          
                                     />
                                </div>
                                  
                                    <div class="form-group">
                                        <button type="submit" class="btn form-control btn-primary rounded submit px-3" style={{ background: '#1f1f38' }}  onClick={handleSubmit}>Register</button>

                                    </div>
                                </form>
                                <div class="w-100 text-center mt-4 text">
                                    <p class="mb-0"> have an account?</p>
                                    <NavLink className='' to="/login">login</NavLink>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )

}
export default RegisterPage;