import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { MockTT, WorldCupQatar } from "../typechain-types";
import { Countries } from "./Country";
import { GuessType } from "./GuessType";

const BN = ethers.BigNumber;
const TT = ethers.utils.parseEther;
const E18 = BN.from("1000000000000000000");

describe("WorldCupQatar", function () {
  let owner: SignerWithAddress;
  let player1: SignerWithAddress;
  let player2: SignerWithAddress;
  let player3: SignerWithAddress;
  let vault: SignerWithAddress;
  let tt: MockTT;
  let wc: WorldCupQatar;

  beforeEach(async () => {
    [owner, player1, player2, player3, vault] = await ethers.getSigners();
    let MockTT = await ethers.getContractFactory("MockTT");
    tt = await MockTT.deploy();
    await tt.deployed();

    let WorldCupQatar = await ethers.getContractFactory("WorldCupQatar");
    wc = await WorldCupQatar.deploy(owner.address, vault.address);
    await wc.deployed();

    await tt.connect(owner).mint(player1.address, ethers.utils.parseEther("1000"));
    await tt.connect(owner).mint(player2.address, ethers.utils.parseEther("1000"));
    await tt.connect(owner).mint(player3.address, ethers.utils.parseEther("1000"));

    await tt.connect(player1).approve(wc.address, ethers.utils.parseEther("1000"));
    await tt.connect(player2).approve(wc.address, ethers.utils.parseEther("1000"));
    await tt.connect(player3).approve(wc.address, ethers.utils.parseEther("1000"));
  });

  afterEach(async () => {
    let b1 = await tt.balanceOf(vault.address);
    let b0 = await tt.balanceOf(wc.address);
    let p1 = await tt.balanceOf(player1.address);
    let p2 = await tt.balanceOf(player2.address);
    let p3 = await tt.balanceOf(player3.address);

    expect(b1.add(b0).add(p1).add(p2).add(p3)).to.equal(ethers.utils.parseEther("3000"), "final balance mismatch");
  });

  it("winlose nobody win", async () => {
    let countryA = Countries.Senegal.id;
    let countryB = Countries.Argentina.id;
    let now = (await ethers.provider.getBlock('latest')).timestamp;
    let matchStart = now + 60 * 60;
    let matchEnd = matchStart + 30*60;
    let guessStart = matchStart - 30 * 60;
    let guessEnd = matchStart;

    await wc.startMatch(countryA, countryB, matchStart, matchEnd, guessStart, guessEnd, tt.address);
    // fastforward to guess start time
    await ethers.provider.send("evm_setNextBlockTimestamp", [guessStart]);
    await ethers.provider.send("evm_mine", []);

    const P1BetAmount = TT("10");
    const P2BetAmount = TT("15");
    const FEE1 = P1BetAmount.mul(3).div(100);
    const FEE2 = P2BetAmount.mul(3).div(100);

    await wc.connect(player1).guess(1, GuessType.GUESS_WINLOSE_B_WIN, P1BetAmount);
    await wc.connect(player2).guess(1, GuessType.GUESS_WINLOSE_A_WIN, P2BetAmount);

    // fast forward to match end
    await ethers.provider.send("evm_setNextBlockTimestamp", [matchEnd]);
    await ethers.provider.send("evm_mine", []);

    await wc.connect(owner).setScores(1, 3, 3);
    await wc.connect(owner).setScores(1, 4, 3);
    await wc.connect(owner).setScores(1, 3, 3);


    let beforeAmount = await tt.balanceOf(vault.address);
    await wc.connect(owner).setMatchFinished(1);
    let afterAmount = await tt.balanceOf(vault.address);

    expect(afterAmount.sub(beforeAmount)).to.equal(P1BetAmount.add(P2BetAmount).sub(FEE1).sub(FEE2));
  });
});
