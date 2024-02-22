import db from "../models/index.js";

// model declaration
const Owner = db.owners;


// code for CRUD on the owner model

// 1. Create and Save a new owner

const createOwner = async (req,res) => {
    // Validate request
    if (!req.body.name || !req.body.email || !req.body.phone || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a owner
    const restaurantOwner = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        address: req.body.address || null,
    };

    // Save owner in the database
    await Owner.create(restaurantOwner)
        .then(owner => {
            res.status(200).send(owner);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while creating the owner."
            });
        });
}

// 2. Retrieve all owners from the database.

const findAllOwners = async (req,res) => {
    await Owner.findAll({
        attributes: ['id', 'name', 'email', 'phone', 'address', 'admin']
    })
        .then(owners => {
            res.status(200).send(owners);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while retrieving owners."
            });
        });
}

// 3. Find a single owner with an id

const findOwnerById = async (req,res) => {
    const id = req.params.id;

    await Owner.findByPk(id)
        .then(owner => {
            res.status(200).send(owner);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error retrieving owner with id=" + id
            });
        });
}

// find owner by email

const findOwnerByEmail = async (req,res) => {
    const email = req.body.email;

    await Owner.findOne({
        where: { email: email }
    })
        .then(owner => {
            res.status(200).send(owner);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error retrieving owner with email=" + email
            });
        });
}   

// 4 Update a owner by the id in the request

const updateOwner = async (req,res) => {
    const id = req.params.id;

    await Owner.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Owner was updated successfully."
            });
        } else {
            res.status(400).send({
                message: `Cannot update Owner with id=${id}. Maybe Owner was not found or body has error or is empty!`
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({
            message: "Error updating Owner with id=" + id
        });
    });
}

// 5. Delete a owner with the specified id in the request

const deleteOwner = async (req,res) => {
    const id = req.params.id;

    const deleteInfo = {'admin': false, 'deletedAt': new Date()}
    await Owner.update(deleteInfo,{
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Owner was deleted successfully!"
            });
        } else {
            res.status(400).send({
                message: `Cannot delete Owner with id=${id}. Maybe Owner was not found!`
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({
            message: "Could not delete Owner with id=" + id
        });
    });
}

export default {
    createOwner,
    findAllOwners,
    findOwnerById,
    findOwnerByEmail,
    updateOwner,
    deleteOwner
} 
