import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Login = ({ setComponent }) => {
    const navigate = useNavigate();
    const [userData, setData] = useState({
        email: "",
        password: ''
    });
    const handleChange = (e) => {
        setData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        localStorage.removeItem("user")
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("http://localhost:5000/users/login", userData);
            localStorage.setItem("user", JSON.stringify({ ...result.data.user, token: result.data.token }))
            navigate('/dashboard')
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <>
            <section className="form-section mt-2">
                <div className="forms">
                    <div className="form-content">
                        <div className="login-form">
                            <div className="title">Login</div>
                            <div className="input-boxes">
                                <div className="input-box">
                                    <FontAwesomeIcon className="icon" icon="fas fa-envelope" />
                                    <input type="email" placeholder="Enter your email" required value={userData.email} name="email" onChange={handleChange} />
                                </div>
                                <div className="input-box">
                                    <FontAwesomeIcon className="icon" icon="fas fa-lock" />
                                    <input type="password" placeholder="Enter your password" required value={userData.password} name="password" onChange={handleChange} />
                                </div>

                                <div className="button input-box">

                                    <button type="submit" onClick={onSubmit}>Login</button>
                                </div>

                                <div className="text sign-up-text">Don't have an account? <div onClick={() => setComponent("signUp")}><label for="flip">Sigup
                                    now</label></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;