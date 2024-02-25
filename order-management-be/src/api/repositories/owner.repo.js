import db from "../../config/database.js";

const Owner = db.owners;

const ownerRepo = async (restaurantOwner) => {
    return await Owner.create(restaurantOwner);
}

export default ownerRepo;