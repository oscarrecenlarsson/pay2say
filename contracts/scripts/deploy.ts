import { ethers } from "hardhat";

async function main() {
  const pay2say = await ethers.deployContract("pay2say");

  await pay2say.waitForDeployment();

  console.log(`pay2say deployed to ${pay2say.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
