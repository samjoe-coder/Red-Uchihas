import { db } from "../../config/database.js";

const create = async (hotel) => {
    return await db.hotels.create(hotel);
}
export { create };