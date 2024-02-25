import ownerRepo from "../repositories/owner.repo.js";
import { generateSalt, hashPassword } from "../../config/cryptoJS.js";

const ownerCreation = async (restaurantOwner) => {

    const salt = generateSalt();
    const hashedPassword = hashPassword(restaurantOwner.password, salt);

    restaurantOwner.password = hashedPassword;

    return await ownerRepo(restaurantOwner);
}

export default ownerCreation;