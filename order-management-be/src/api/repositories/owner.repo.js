import { db } from "../../config/database.js";

const create = async (restaurantOwner) => {
    return await db.owners.create(restaurantOwner);
}
export { create };