
const Notes = require("../models/notes.model");

exports.getAll = (req, res) => {
    Notes.find({ userId: req.user }).then((note) => {
        res.json(note)
    }).catch((err) => {
        console.log(err.message);
    })
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "title can not be empty!" });
        return;
    }

    if (!req.body.description) {
        res.status(400).send({ message: "description can not be empty!" });
        return;
    }
    // Create a Note
    const note = new Notes({
        title: req.body.title,
        description: req.body.description,
        userId: req.user
    });
    // Save Note in the database
    note
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the notes."
            });
        });
};



exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Notes.findOneAndUpdate({ _id: id }, { $set: { ...req.body } }, { new: true })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    massage: `Cannot update notes with id = ${id}. May be Notes was not found!`
                });
            } else res.send({ message: "Notes was updated successfully.", note: data });
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating Notes with id=" + id });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Notes.findByIdAndDelete({ _id: id })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Notes with id=${id}.Product was not found!`
                });
            }
            else {
                res.send({
                    message: "Notes was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Notes with id=" + id
            });
        });
};



