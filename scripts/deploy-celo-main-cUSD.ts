import { ethers } from "hardhat";

const OWNER_ADDRESS = process.env.PUBLIC_ADDRESS_PROD;
const cUSD = "0x765de816845861e75a25fca122bb6898b8b1282a";
const operatorWalletAddress = "0x2e7997BaF30435d70b5a2EC3eA334975b16C5204";

async function main() {
  const deployer = OWNER_ADDRESS;
  const currency = cUSD;
  const fw = operatorWalletAddress;

  console.log("Deploying contract with the account:", deployer);

  const TravelSaver = await ethers.getContractFactory("TravelSaver");
  const travelSaver = await TravelSaver.deploy(currency, fw);

  await travelSaver.deployed();

  console.log(
    "TravelSaver cUSD in celo main, deployed to:",
    travelSaver.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
