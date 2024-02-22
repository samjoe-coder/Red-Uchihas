import db from "../models/index.js";

// model declaration
const Table = db.tables;

// code for CRUD on the table model

// 1. Create and Save a new table

const createTable = async (req,res) => {
    // Validate request
    if (!req.body.number || !req.body.qrDetails || !req.body.hotelId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a table
    const table = {
        number: req.body.tableNumber,
        qrDetails: req.body.qrDetails,
        hotelId: req.body.hotelId
    };

    // Save table in the database
    await Table.create(table)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while creating the table."
            });
        });
}

// 2. Retrieve all tables from the database.

const findTablesByHotelId = async (req,res) => {
    const hotelId = req.params.hotelId;

    await Table.findAll({
        where: {hotelId: hotelId},
        attributes: ['id', 'number', 'qrDetails', 'hotelId', 'status']
    })
        .then(tables => {
            res.status(200).send(tables);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while retrieving tables."
            });
        });
}

// 3. Find a single table with an id

const findTableById = async (req,res) => {
    const id = req.params.id;

    await Table.findByPk(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error retrieving table with id=" + id
            });
        });
}

// 4. Update a table by the id in the request

const updateTable = async (req,res) => {
    const id = req.params.id;

    await Table.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Table was updated successfully."
                });
            } else {
                res.status(400).send({
                    message: `Cannot update Table with id=${id}. Maybe Table was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error updating Table with id=" + id
            });
        });
}

// 5. Delete a table with the specified id in the request

const deleteTable = async (req,res) => {
    const id = req.params.id;

    await Table.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Table was deleted successfully!"
                });
            } else {
                res.status(400).send({
                    message: `Cannot delete Table with id=${id}. Maybe Table was not found!`
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Could not delete Table with id=" + id
            });
        });
}

export default {
    createTable,
    findTablesByHotelId,
    findTableById,
    updateTable,
    deleteTable
};