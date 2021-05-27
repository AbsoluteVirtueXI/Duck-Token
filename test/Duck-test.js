/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { expect } = require('chai');

describe('Duck token', function () {
  let dev, owner, alice, bob, charlie, dan, Duck, duck;
  const INIT_SUPPLY = ethers.utils.parseEther('1000000');
  const NAME = 'Duck';
  const SYMBOL = 'DCK';
  const DECIMALS = 18;
  beforeEach(async function () {
    [dev, owner, alice, bob, charlie, dan] = await ethers.getSigners();
    Duck = await ethers.getContractFactory('Duck');
    const ethBalanceBefore = await alice.getBalance();
    duck = await Duck.connect(dev).deploy(owner.address, INIT_SUPPLY);
    await duck.deployed();
  });
  describe('Deployment', function () {
    it(`Should have name ${NAME}`, async function () {
      expect(await duck.name()).to.equal(NAME);
    });
    it(`Should have symbol ${SYMBOL}`, async function () {
      expect(await duck.symbol()).to.equal(SYMBOL);
    });
    it(`Should have decimals ${DECIMALS}`, async function () {
      expect(await duck.decimals()).to.equal(DECIMALS);
    });
    it(`Should have total supply ${INIT_SUPPLY.toString()}`, async function () {
      expect(await duck.totalSupply()).to.equal(INIT_SUPPLY);
    });
    it(`Should mint total supply ${INIT_SUPPLY.toString()} to owner`, async function () {
      expect(await duck.balanceOf(owner.address)).to.equal(INIT_SUPPLY);
    });
    it('Should emit Transfer at deployment', async function () {
      const receipt = await duck.deployTransaction.wait();
      const txHash = receipt.transactionHash;
      await expect(txHash).to.emit(duck, 'Transfer').withArgs(ethers.constants.AddressZero, owner.address, INIT_SUPPLY);
    });
  });
});
