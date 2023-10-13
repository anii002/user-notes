
import axios from 'axios';
import React, { useState } from 'react';

const AddNotes = ({ setAddNote, newNotes, edit }) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            userId: user.id,
            title,
            description
        }
        axios.post(`http://localhost:5000/notes`, body, {
            headers: {
                'x-auth-token': user.token
            }
        }).then((res) => {
            newNotes(res.data)
            setTitle("")
            setDescription("")
        })
    };

    return (
        <form onSubmit={handleSubmit} className='shadow-lg p-3'>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="d-flex justify-content-between ">
                <button type="submit" className="btn btn-primary">{edit ? "Update" : "Submit"}</button>
                <button className="btn btn-danger px-2" onClick={() => setAddNote(false)}>Cancel</button>
            </div>
        </form>
    );
};

export default AddNotes;
