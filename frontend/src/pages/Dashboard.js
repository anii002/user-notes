import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import AllNotes from "./AllNotes";
import AddNotes from "./AddNotes";
import axios from "axios";
import EditNotes from "./EditNotes";

const DashBoard = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [updateNotes, setUpdateNotes] = useState({})
    const [addNote, setAddNote] = useState(false)
    const [editNote, setEditNote] = useState(false)
    const [notes, setNotes] = useState([])
    const navigate = useNavigate();
    const deleteNotes = (id) => {
        axios.delete(`http://localhost:5000/notes/${id}`).then((res) => {
            const filterNotes = notes.filter((item) => item._id !== id)
            setNotes(filterNotes)
            setUpdateNotes({})
            setAddNote(false)
        })
    }
    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/notes/all`, {
            headers: {
                'x-auth-token': user.token
            }
        }).then((res) => {
            setNotes(res.data)
        })
    }, [])
    const getUpdatedNotes = (note) => {
        let toUpdateNotes = notes.map((item) => {
            if (item._id === note._id) {
                return note
            }
            return item
        })
        setNotes(toUpdateNotes)

    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between">
                <div>
                    <h4>Notes list</h4>
                </div>
                <div>
                    <button className="btn btn-secondary" onClick={() => setAddNote(true)} >add</button>
                </div>
            </div>

            <div className="row d-flex flex-wrap justify-content-between mt-5">
                <div className="col-lg-6">
                    <AllNotes notes={notes} setUpdateNotes={setUpdateNotes} setAddNote={setAddNote} />
                </div>
                <div className={`row col-lg-3  d-flex flex-wrap justify-content-between mb-5 bg-body rounded ${Object.keys(updateNotes).length > 2 && !addNote && !editNote && "shadow-lg p-2"} `}>
                    {editNote && <EditNotes updateNotes={updateNotes} setUpdateNotes={setUpdateNotes} getUpdatedNotes={getUpdatedNotes} setAddNote={setAddNote} setEditNote={setEditNote} />}
                    {Object.keys(updateNotes).length > 2 && !addNote && !editNote
                        &&
                        <>
                        <div className="d-flex justify-content-between">
                            <div className="m-2">
                                <h4>{updateNotes.title}</h4>
                                <p>{updateNotes.description}</p>

                            </div>
                            <div className="m-2">
                                <div><button className="btn btn-warning" onClick={() => setEditNote(true)}>edit</button></div>
                                <div><button className="btn btn-danger mt-3" onClick={() => deleteNotes(updateNotes._id)}>delete</button></div>
                            </div>
                        </div>
                        </>
                    }
                    {addNote &&
                        <div className="m-2">
                            <AddNotes setAddNote={setAddNote} newNotes={(newNote) => setNotes([...notes, newNote])} />
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default DashBoard;