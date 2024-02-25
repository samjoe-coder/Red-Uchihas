import CryptoJS from "crypto-js";

function generateSalt() {
    return CryptoJS.lib.WordArray.random(16).toString();
}

function hashPassword(password, salt) {
    const hashedPassword = CryptoJS.SHA256(password + salt).toString(CryptoJS.enc.Hex);
    return hashedPassword;
}

export { generateSalt, hashPassword };