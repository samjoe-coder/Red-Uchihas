import { create } from "../repositories/hotel.repo.js";

const hotelCreation = async (hotel) => {

    return await create(hotel);

}

export { hotelCreation };