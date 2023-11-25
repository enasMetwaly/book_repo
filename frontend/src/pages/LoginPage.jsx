
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { login, reset, getUserInfo } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from "../components/spinner/Spinner"
import './login/css/style.css'
 import bgImg from './login/images/bg.jpg'; // Import the image
 import { BiLogInCircle } from "react-icons/bi"


const LoginPage = () => {

    const [formData, setFormData] = useState({
        "email": "",
        "password": "",
    })

    const { email, password } = formData

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

        const userData = {
            email,
            password,
        }
        dispatch(login(userData))
    }


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate("/")
        }

        dispatch(reset())
        dispatch(getUserInfo())

    }, [isError, isSuccess, user, navigate, dispatch])

    const divStyle = {
        backgroundImage: `url(${bgImg})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };

    return (
        <>
         

    <section class="ftco-section">
		<div class="container"    >
			<div class="row justify-content-center " >
				<div class="col-md-6 text-center mb-5 " >
					<h1 class="heading-section">Login  <BiLogInCircle /></h1>
				</div>
			</div>
			<div class="row justify-content-center" >
				<div class="col-md-6 col-lg-4">
					<div class="login-wrap py-5">
		      	<div class="img "
                   style={divStyle}               
                ></div>
                <img src={bgImg} style={{ borderRadius: '50%', width: '120px', height: '120px',    margin: 'auto'
}} />
                <h3 class="text-center mb-0">Welcome</h3>
		      	<p class="text-center">Sign in by entering the information below</p>
						<form action="#" class="login-form">
		      		<div class="form-group">
		      			<input type="text" class="form-control" 
                          placeholder="email"
                            name="email"
                            onChange={handleChange}
                            value={email}
                            required                        
                        />
		      		</div>
	            <div class="form-group">
	              <input type="password" class="form-control"
                  placeholder="password"
                name="password"
                onChange={handleChange}
                value={password}
                required             
                    />
	            </div>
	            <div class="form-group d-md-flex">
								<div class="w-100 text-md-right">
                                    <Link to="/reset-password">Forget Password ?</Link>
								</div>
	            </div>
	            <div class="form-group">
	            	<button class="btn form-control btn-primary rounded submit px-3" style={{ background: '#1f1f38' }} type="submit" onClick={handleSubmit}>Login</button>
	            </div>
	          </form>
	          <div class="w-100 text-center mt-4 text">
	          	<p class="mb-0">Don't have an account?</p>
                  <Link to="/register">Sign Up</Link>
                  </div>
	        </div>
				</div>
			</div>
		</div>
	</section>
        </>
    )
}

export default LoginPage