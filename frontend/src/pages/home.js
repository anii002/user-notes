/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import Login from "./login";
import Register from "./signUp";
import notes from "../images/notes.jpg";

const Home = () => {
    const [page, setPage] = useState("login")
    const setComponent = (val) => {
        setPage(val)
    }
    return (
        <div className="home mx-2 mb-3">
            <div className="row d-flex flex-wrap justify-content-between">
                <div className="col-lg-6">
                    <h4 className="mt-2">Users Notes</h4>
                    <img src={notes} alt="image" className="img-fluid rounded-3" />
                </div>
                <div className="col-lg-3 mx-auto mt-5">
                    {page === "login" ?
                        <Login setComponent={setComponent} />
                        : <Register setComponent={setComponent} />}
                </div>
            </div>
        </div>
    );
}

export default Home;