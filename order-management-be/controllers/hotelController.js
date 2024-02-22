import db from "../models/index.js";

// model declaration
const Hotel = db.hotels;

// code for CRUD on the hotel model

// 1. Create and Save a new hotel

const createHotel = async (req,res) => {
    // Validate request
    if (!req.body.name || !req.body.address || !req.body.customer_care_number || !req.body.ownerId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a hotel
    const hotel = {
        name: req.body.name,
        address: req.body.address,
        description: req.body.description || null,
        customer_care_number: req.body.customer_care_number,
        logo: req.body.logo || null,
        ownerId: req.body.ownerId
    };

    // Save hotel in the database
    await Hotel.create(hotel)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while creating the hotel."
            });
        });
}

// 2. Retrieve all hotels from the database.

const findAllHotels = async (req,res) => {
    await Hotel.findAll({
        attributes: ['id', 'name', 'address', 'description', 'avgRating', 'customer_care_number', 'logo']
    })
        .then(hotels => {
            res.status(200).send(hotels);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while retrieving hotels."
            });
        });
}

// 3. Find a single hotel with an id

const findHotelById = async (req,res) => {
    const id = req.params.id;

    await Hotel.findByPk(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error retrieving hotel with id=" + id
            });
        });
}

// 4. Update a hotel by the id in the request

const updateHotel = async (req,res) => {
    const id = req.params.id;

    await Hotel.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Hotel was updated successfully."
                });
            } else {
                res.status(400).send({
                    message: `Cannot update hotel with id=${id}. Maybe hotel was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error updating hotel with id=" + id
            });
        });
}

// 5. Delete a hotel with the specified id in the request

const deleteHotel = async (req,res) => {
    const id = req.params.id;

    const deleteInfo = {'active': false, 'deletedAt': new Date()}
    await Hotel.update(deleteInfo,{
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Hotel was deleted successfully!"
                });
            } else {
                res.status(400).send({
                    message: `Cannot delete hotel with id=${id}. Maybe hotel was not found!`
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Could not delete hotel with id=" + id
            });
        });
}

export default {createHotel, findAllHotels, findHotelById, updateHotel, deleteHotel};
