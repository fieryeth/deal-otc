const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deal contract", function () {
  let owner, addr2;
  let FakeToken1, FakeToken2;
  let fakeToken1, fakeToken2;
  let Deal, deal;

  beforeEach("Deploy a Deal with FakeTokens", async function () {
    [owner, addr2] = await ethers.getSigners();
    FakeToken1 = await ethers.getContractFactory("FakeToken1");
    fakeToken1 = await FakeToken1.deploy();
    FakeToken2 = await ethers.getContractFactory("FakeToken2");
    fakeToken2 = await FakeToken2.deploy();
    fakeToken2.transfer(addr2.address, 20000);

    Deal = await ethers.getContractFactory("Deal")
    deal = await Deal.deploy(
      owner.address,
      addr2.address,
      fakeToken1.address,
      fakeToken2.address,
      "100",
      "200"
    )

  });

  describe("Deployment", () => {
    it("Should set parameters of the Deal right", async () => {
      expect(await deal.user0()).to.equal(owner.address);
      expect(await deal.user1()).to.equal(addr2.address);
      expect(await deal.token0()).to.equal(fakeToken1.address);
      expect(await deal.token1()).to.equal(fakeToken2.address);
      expect(await deal.amount0()).to.equal("100");
      expect(await deal.amount1()).to.equal("200");
    })
  })

  describe("Send tokens through deposit methods", () => {
    it("Should deposit token0 (FakeToken1)", async () => {
      await fakeToken1.approve(deal.address, 100);
      await deal.depositToken0(100);
      expect(await fakeToken1.balanceOf(deal.address)).to.equal(100)
    })

    it("Should deposit token1 (FakeToken2)", async () => {
      await fakeToken2.connect(addr2).approve(deal.address, 200);
      await deal.connect(addr2).depositToken1(200);
      expect(await fakeToken2.balanceOf(deal.address)).to.equal(200)
    })

    it("Should claim for both", async () => {
      await fakeToken1.approve(deal.address, 100);
      await deal.depositToken0(100);
      await fakeToken2.connect(addr2).approve(deal.address, 200);
      await deal.connect(addr2).depositToken1(200);
      await deal.claimForBoth()

      expect(await fakeToken1.balanceOf(addr2.address)).to.equal(100)
      expect(await fakeToken2.balanceOf(owner.address)).to.equal(200)
    })
  })
});
