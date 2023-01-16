const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main() {
  //create the provider,wallet,abi,binary here
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("deploying, please wait...");
  const contract = await contractFactory.deploy();
  //^add overides like gasPrice, gasLimit by adding {} into the deploy function
  //   console.log(
  //     `here is the deployment transaction: ${contract.deployTransaction}`
  //   );

  //next line is to wait a specific number of blocks before our transaction receipt is generated
  //you only get a transaction receipt when you wait for a number of blocks but you get the deployment receipt as soon as you send the transaction.
  const deploymentReceipt = contract.deployTransaction.wait(1);
  //   console.log(` here is the transaction receipt: ${deploymentReceipt}`);

  const favoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${favoriteNumber.toString()}`);
  const transactionResponse = await contract.store("1738");
  const transactionReceipt = await transactionResponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`Updated favorite number is: ${updatedFavoriteNumber}`);
  const privateKey = process.env.PRIVATE_KEY;
  console.log(`this is your private key: ${privateKey} `);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    console.error(error);
  });
