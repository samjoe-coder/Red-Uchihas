import db from "../models/index.js";

// model declaration
const Menu = db.menus;

// code for CRUD on the menu model

// 1. Create and Save a new menu

const createMenu = async (req,res) => {
    // Validate request
    if (!req.body.name || !req.body.category || !req.body.price || !req.body.hotelId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a menu
    const menu = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity || null,
        description: req.body.description || null,
        hotelId: req.body.hotelId
    };

    // Save menu in the database
    await Menu.create(menu)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while creating the menu."
            });
        });
}

// 2. Retrieve all menus from the database.

const findAllMenus = async (req,res) => {
    await Menu.findAll({
        attributes: ['id', 'name', 'category', 'price', 'quantity', 'description', 'hotelId']
    })
        .then(menus => {
            res.status(200).send(menus);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while retrieving menus."
            });
        });
}

// 3. Find a single menu with an id

const findMenuById = async (req,res) => {
    const id = req.params.id;

    await Menu.findByPk(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error retrieving menu with id=" + id
            });
        });
}

// 4. Update a menu by the id in the request

const updateMenu = async (req,res) => {
    const id = req.params.id;

    await Menu.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Menu was updated successfully."
                });
            } else {
                res.status(400).send({
                    message: `Cannot update Menu with id=${id}. Maybe Menu was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error updating Menu with id=" + id
            });
        });
}

// 5. Delete a menu with the specified id in the request

const deleteMenu = async (req,res) => {
    const id = req.params.id;

    await Menu.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Menu was deleted successfully!"
                });
            } else {
                res.status(400).send({
                    message: `Cannot delete Menu with id=${id}. Maybe Menu was not found!`
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Could not delete Menu with id=" + id
            });
        });
}

export default { createMenu, findAllMenus, findMenuById, updateMenu, deleteMenu };