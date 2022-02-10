async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying Deal.sol and Fake Tokens with the account:",
    deployer.address
  );
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Multicall = await ethers.getContractFactory("Multicall");
  const multicall = await Multicall.deploy();

  const FakeToken1 = await ethers.getContractFactory("FakeToken1");
  const ft1 = await FakeToken1.deploy();

  const FakeToken2 = await ethers.getContractFactory("FakeToken2");
  const ft2 = await FakeToken2.deploy();

  const Deal = await ethers.getContractFactory("Deal");
  const deal = await Deal.deploy(
    "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    ft1.address,
    ft2.address,
    "100",
    "200"
  );

  console.log("Multicall address:", multicall.address);
  console.log("FakeToken1 address:", ft1.address);
  console.log("FakeToken2 address:", ft2.address);
  console.log("Deal address:", deal.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
