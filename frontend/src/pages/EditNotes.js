import axios from 'axios';
import React, { useState } from 'react';

const EditNotes = ({ updateNotes, getUpdatedNotes, setAddNote, setEditNote, setUpdateNotes }) => {
    const [title, setTitle] = useState(updateNotes.title);
    const [description, setDescription] = useState(updateNotes.description);

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            title,
            description
        }
        axios.put(`http://localhost:5000/notes/${updateNotes._id}`, body, {
        }).then((res) => {
            getUpdatedNotes(res.data.note)
            setUpdateNotes(res.data.note)
            setTitle("")
            setDescription("")
            setEditNote(false)
            setAddNote(false)
        })
    };

    return (
        <form onSubmit={handleSubmit} className='shadow-lg p-3' >
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
            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">Update</button>
                <button className="btn btn-danger" onClick={() => setEditNote(false)}>Cancel</button>
            </div>

        </form>
    );
};

export default EditNotes;
