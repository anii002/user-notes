import axios from "axios";
import { useState } from "react";
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Register = ({ setComponent }) => {
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        checkpassword: ''
    })

    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/users/register", input);
            console.log("🚀 ~ file: signUp.js:30 ~ handleSubmit ~ res:", res)
            swal("Created!!")
            setComponent("login")

        } catch (err) {
            alert(err.response.data.msg);
        }
    }
    return (
        <>
            <section class="form-section">
                
                    <div class="forms">
                        <div class="form-content">
                            <div class="signup-form">
                                <div class="title">Signup</div>
                                <form action="#">
                                    <div class="input-boxes">
                                        <div class="input-box">
                                            <FontAwesomeIcon className="icon" icon="fa-solid fa-user" />
                                            <input type="text" placeholder="Enter your name" value={input.name} name="name" required onChange={handleChange} />
                                        </div>
                                        <div class="input-box">
                                            <FontAwesomeIcon className="icon" icon="fas fa-envelope" />
                                            <input type="text" placeholder="Enter your email" value={input.email} name="email" required onChange={handleChange} />
                                        </div>
                                        <div class="input-box">
                                            <FontAwesomeIcon className="icon" icon="fas fa-lock" />
                                            <input type="password" placeholder="Enter your password" value={input.password} name="password" required onChange={handleChange} />
                                        </div>
                                        <div class="input-box">

                                            <FontAwesomeIcon className="icon" icon="fas fa-lock" />
                                            <input type="password" placeholder="Enter your check password" value={input.checkpassword} name="checkpassword" required onChange={handleChange} />
                                        </div>
                                        <div class="button input-box">
                                            <button type="submit" onClick={handleSubmit}>Submit</button>
                                        </div>
                                        <div class="text sign-up-text">Already have an account?<div onClick={() => setComponent("login")}> <label for="flip">Login
                                            now</label></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
              
            </section>
        </>
    )
}

export default Register;