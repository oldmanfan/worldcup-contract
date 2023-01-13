import { ethers } from "hardhat";
import { GuessType } from "../test/GuessType";
import { Address, player1, player2, player3 } from "./address";

import {BigNumber} from "ethers";
import { BaseGuess, Match } from "../typechain-types";

import 'delay';
import delay from "delay";

async function showGuess(match: Match, guess: BaseGuess) {
    const totalSeq = await guess.totalSeq();

    for (let i = totalSeq.toNumber(); i > 0; i--) {
        await delay(100);
        const betId = await guess.sequenceRecords(i);
        await delay(100);
        const [matchId, guessType, player] = await match.parseBetId(betId);
        await delay(100);
        const isWin = await match.isWin(guessType);
        if (!isWin) continue;
        await delay(100);
        const [betAmount, betTime, rClaimed] = await guess.getPlayerBetInfo(player, guessType);
        if (rClaimed.isZero()) {
            await delay(100);
            const payback = await guess.payback(player, guessType);

            console.log(`
                player: ${player}
                matchId: ${matchId}, guessType: ${guessType}, payback: ${payback}, claimed: ${rClaimed}
            `)
        }
    }
}

async function main() {
    const wc = await ethers.getContractAt('WorldCupQatar', Address.qatar);
    // const totalMatches = await wc.totalMatches();

    // for (let i = totalMatches.toNumber(); i >= 1; i--) {
    for (let i = 64; i >= 1; i--) {
        try {
        await delay(100);
        const matchAddr = await wc.matches(i);

        const match = await ethers.getContractAt("Match", matchAddr);
        await delay(100);
        const winlossAddr = await match.winLose();
        await delay(100);
        const scoreGuessAddr = await match.scoreGuess();

        const winloss = await ethers.getContractAt("WinLoseGuess", winlossAddr);
        const scoreGuess = await ethers.getContractAt("ScoreGuess", scoreGuessAddr);

        await showGuess(match, winloss);

        await showGuess(match, scoreGuess);
        } catch(e) {
            console.log(`matchId:  ${i} except`)
            await delay(1000);
        }

    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
