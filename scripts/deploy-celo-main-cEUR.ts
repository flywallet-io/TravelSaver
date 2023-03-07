import { ethers } from "hardhat";

const OWNER_ADDRESS = process.env.PUBLIC_ADDRESS_PROD;
const cEUR = "0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73";
const operatorWalletAddress = "0x2e7997BaF30435d70b5a2EC3eA334975b16C5204";

async function main() {
  const deployer = OWNER_ADDRESS;
  const currency = cEUR;
  const fw = operatorWalletAddress;

  console.log("Deploying contract with the account:", deployer);

  const TravelSaver = await ethers.getContractFactory("TravelSaver");
  const travelSaver = await TravelSaver.deploy(currency, fw);

  await travelSaver.deployed();

  console.log(
    "TravelSaver cEUR in celo main, deployed to:",
    travelSaver.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
