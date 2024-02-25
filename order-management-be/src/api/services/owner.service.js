import create from "../repositories/owner.repo.js";
import { generateSalt, hashPassword } from "../../config/passwordHashing.js";

const ownerCreation = async (restaurantOwner) => {

    const salt = generateSalt();
    const hashedPassword = hashPassword(restaurantOwner.password, salt);

    restaurantOwner.password = hashedPassword;

    return await create(restaurantOwner);
}

export default ownerCreation;