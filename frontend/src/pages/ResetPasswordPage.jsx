import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from "../components/spinner/Spinner"
import { resetPassword } from "../features/auth/authSlice"
import forImg from '../assets/forPass.jpeg'; // Import the image

const ResetPasswordPage = () => {

    const [formData, setFormData] = useState({
        "email": "",
    })

    const { email } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)


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
            email
        }

        dispatch(resetPassword(userData))
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            navigate("/")
            toast.success("A reset password email has been sent to you.")

        }


    }, [isError, isSuccess, message, navigate, dispatch])



    return (
        <>
            <div className="container auth__container">
                <h1 className="main__title text-dark">Reset Password </h1>

                {isLoading && <Spinner />}
                <div>
                <img src={forImg} style={{ borderRadius: '50%', width: '250px', height: '250px',    margin: 'auto'
                   }} />
            
                 <form action="#" class="auth__form">
           
                    <input type="text"
                    class="form-control"
                        placeholder="email"
                        name="email"
                        onChange={handleChange}
                        value={email}
                        required
                    />
                    <button className="btn btn-primary" style={{ background: '#1f1f38',width:"200px" }} type="submit" onClick={handleSubmit}>Reset Password</button>
                   </form>
                   </div>
            </div>
        </>
    )
}

export default ResetPasswordPage;
