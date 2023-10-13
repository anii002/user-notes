import React from "react";
const AllNotes = ({ setAddNote, setUpdateNotes, notes }) => {
    return (
        <>
            {notes.length > 0 && notes.map((item) => (
                    <h5 className="shadow-lg p-3 mb-2 bg-body rounded" style={{ cursor: "pointer" }} onClick={() => { setUpdateNotes(item); setAddNote(false) }}>{item.title}</h5>
            ))}
        </>
    )
}
export default AllNotes