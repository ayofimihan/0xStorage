const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config(); 

async function main() {
    const privateKey = process.env.PRIVATE_KEY;
    const password = process.env.PASSWORD;
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
    const encryptedJsonKey = await wallet.encrypt(password,privateKey)
    console.log(encryptedJsonKey);
    fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey)

}
main()
  .then(() => process.exitCode(0))
  .catch((error) => {
    console.log(error);
    console.error(error);
  });
