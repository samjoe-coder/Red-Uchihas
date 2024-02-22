import db from "../models/index.js";

// model declaration
const Order = db.orders;

// code for CRUD on the order model

// 1. Create and Save a new order

const createOrder = async (req,res) => {
    // Validate request
    if (!req.body.customerId || !req.body.orderDetails || !req.body.totalPrice) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a order
    const order = {
        customerId: req.body.customerId,
        orderDetails: req.body.orderDetails,
        totalPrice: req.body.totalPrice,
        status: req.body.status || "Preparing"
    };

    // Save order in the database
    await Order.create(order)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while creating the order."
            });
        });
}

// 2. Retrieve all orders from the database.

const findAllOrders = async (req,res) => {
    await Order.findAll()
        .then(orders => {
            res.status(200).send(orders);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while retrieving orders."
            });
        });
}

// 3. Find a single order with an id

const findOneOrder = async (req,res) => {
    const id = req.params.id;

    await Order.findByPk(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error retrieving order with id=" + id
            });
        });
}

// 4. Update a order by the id in the request

const updateOrder = async (req,res) => {
    const id = req.params.id;

    await Order.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Order was updated successfully."
                });
            } else {
                res.status(400).send({
                    message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error updating Order with id=" + id
            });
        });
}

export default {
    createOrder,
    findAllOrders,
    findOneOrder,
    updateOrder
};