import dbConfig from "../config/dbConfig.js";
import {Sequelize, DataTypes} from "sequelize";

const sequelize = new Sequelize(
    dbConfig.DB, 
    dbConfig.USER, 
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        },
    });

sequelize.authenticate().then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log("Cannot connect to the database", err);
});    

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import all models

import ownerModel from "./ownerModel.js";
import customerModel from "./customerModel.js";
import hotelModel from "./hotelModel.js";
import menuModel from "./menuModel.js";
import tableModel from "./tableModel.js";
import orderModel from "./orderModel.js";
import paymentModel from "./paymentModel.js";
import notificationModel from "./notificationModel.js";

// create all models
db.owners = ownerModel(sequelize, DataTypes);
db.hotels = hotelModel(sequelize, DataTypes);
db.customers = customerModel(sequelize, DataTypes);
db.menus = menuModel(sequelize, DataTypes);
db.tables = tableModel(sequelize, DataTypes);
db.orders = orderModel(sequelize, DataTypes);
db.payments = paymentModel(sequelize, DataTypes);
db.notifications = notificationModel(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
    console.log("re-sync db.");
});

export default db;
