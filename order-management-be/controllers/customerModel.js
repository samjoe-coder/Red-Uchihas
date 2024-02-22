import db from "../models/index.js";

// model declaration
const Customer = db.customers;

// code for CRUD on the customer model

// 1. Create and Save a new customer

const createCustomer = async (req,res) => {
    // Validate request
    if (!req.body.name || !req.body.phone || !req.hotelId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a customer
    const customer = {
        name: req.body.name,
        phone: req.body.phone,
        hotelId: req.body.hotelId
    };

    // Save customer in the database
    await Customer.create(customer)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while creating the customer."
            });
        });
}

// 2. Retrieve all customers from the database.

const findAllCustomers = async (req,res) => {
    await Customer.findAll({
        attributes: ['id', 'name', 'phone', 'hotelId']
    })
        .then(customers => {
            res.status(200).send(customers);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while retrieving customers."
            });
        });
}

// 3. Find a single customer with an id

const findOneCustomer = async (req,res) => {
    const id = req.params.id;

    await Customer.findByPk(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error retrieving customer with id=" + id
            });
        });
}

// 4. Update a customer by the id in the request

const updateCustomer = async (req,res) => {
    const id = req.params.id;

    await Customer.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Customer was updated successfully."
                });
            } else {
                res.status(500).send({
                    message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error updating Customer with id=" + id
            });
        });
}

