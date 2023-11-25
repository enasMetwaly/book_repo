import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { activate, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/spinner/Spinner'
import acImg from '../assets/act.jpeg';


const ActivatePage = () => {


    const { uid, token } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            uid,
            token
        }
        dispatch(activate(userData))
        toast.success("Your account has been activated! You can login now")
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            navigate("/login")
        }

        dispatch(reset())

    }, [isError, isSuccess, navigate, dispatch])


    return (
        <div>
            <div className="container ">
                <h3 className="main__title text-dark " style={{ fontSize: '1.7em' }} >Activate Account  </h3>

                {isLoading && <Spinner />}
                <img src={acImg} style={{ borderRadius: '50%', width: '200px', height: '200px',    margin: 'auto'
            }} />

                <button className="btn btn-activate-account text-light" style={{ background: '#1f1f38', fontSize: '1.5em' }} type="submit" onClick={handleSubmit}>activate account</button>
            </div>
        </div>
    )
}

export default ActivatePage