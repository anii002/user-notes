import React from "react";
import { useNavigate } from "react-router";


const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("user")
    let authUser = (
        <>
            <button type="button" className="btn btn-danger m-2" onClick={() => {
                localStorage.removeItem('user')
                navigate("/")
            }} >Logout</button>
        </>
    )

    return (
        <>
            <header className="header mx-2">
                <div className="d-flex main-header">
                    <div>
                        <h4 className="heading m-2">Notes</h4>
                    </div>
                    <div>
                        {token && authUser}
                    </div>
                </div>
            </header>
        </>

    )
}

export default Header;