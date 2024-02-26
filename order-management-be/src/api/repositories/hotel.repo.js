import { db } from "../../config/database.js";

const create = async (hotel) => {
    return await db.hotels.create(hotel);
}

const update = async (hotel) => {
    return await db.hotels.update(hotel, { where: { id: hotel.id } });
}

export { create, update };