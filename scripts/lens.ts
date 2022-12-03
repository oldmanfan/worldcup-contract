import { ethers } from "hardhat";
import { GuessType } from "../test/GuessType";
import { Address, player1, player2, player3 } from "./address";

import {BigNumber} from "ethers";

const BN = ethers.BigNumber;

export function toDecimal(s: string | BigNumber) {
    if (typeof s !== 'string') s = s.toString();

    if (s.length < 19) s = '0'.repeat(19 - s.length).concat(s);

    const delimi = s.length - 18;
    let deno = s.substring(0, delimi);
    let num = s.substring(delimi);
    return deno +'.' + num;
}

function printTopNRecord(tag: string, rs: any[]) {
    let counts = rs.length;
    console.log(tag);
    for (let i = 0; i < counts; i++) {
        let ks = rs[i];
        console.log(`
        betId:     ${ks[0]}
        player:    ${ks[1]}
        guessType: ${ks[2]}
        betAmount: ${toDecimal(ks[3])}
        betTime  : ${ks[4]}

        `)
    }
}

function printAllMatches(m: any[]) {

    const showOdds = (odds: any[]) => {
        let cnt = odds.length;
        let s = "";
        for (let i = 0; i < cnt; i++) {
            s += `${toDecimal(odds[i])},`
        }

        return s;
    }

    const showRecords = (rds: any[]) => {
        let s = "";
        for (let it of rds) {
            s += `
                betId:         ${it[0]},
                guessType:     ${it[1]},
                betAmount:     ${toDecimal(it[2])},
                betTime:       ${it[3]},
                claimedAmount: ${toDecimal(it[4])},
                odds:          ${toDecimal(it[5])},
                win:           ${toDecimal(it[6])}

            `;
        }
        return s;
    }

    let count = m.length;
    for (let i = 0; i < count; i++) {
        let mat = m[i];
        console.log(`
        matchId:    ${mat[0]},
        status:     ${mat[1]},
        countryA:   ${mat[2]},
        countryB:   ${mat[3]},
        matchStart: ${mat[4]},
        matchEnd:   ${mat[5]},
        guessStart: ${mat[6]},
        guessEnd:   ${mat[7]},
        scoresA:    ${mat[8]},
        scoresB:    ${mat[9]},
        payToken:   ${mat[10]},

        winLosePool:
            deposited:     ${toDecimal(mat[11][0])},
            withdrawed:    ${toDecimal(mat[11][1])},
            playersAmount: ${mat[11][2]},
            odds: [${showOdds(mat[11][3])}]
            totalBetAmount: [${showOdds(mat[11][4])}]

        scoreGuessPool:
            deposited:     ${toDecimal(mat[12][0])},
            withdrawed:    ${toDecimal(mat[12][1])},
            playersAmount: ${mat[12][2]},
            odds: [${showOdds(mat[12][3])}]
            eachBetAmount: [${showOdds(mat[12][4])}]

        winloseRecords:
            ${showRecords(mat[13])}

        scoreGuessRecords:
            ${showRecords(mat[14])}

        isPaused: ${mat[15]}

        payTokenName:     ${mat[16]}
        payTokenSymbol:   ${mat[17]}
        payTokenDecimals: ${mat[18]}
        -----------------------------------------------

        `)
    }
}

async function main() {

    const lens = await ethers.getContractAt("WorldCupLens", Address.lens);
    const player = '0x491040cbf178ec2b7be05c53de68821cc7641831'
    // for (let player of [player3]) {
        const matches: any[] = [];
        let r0 = await lens.getMatches(Address.qatar, player, BigNumber.from(1), BigNumber.from(45));
        let r1 = await lens.getMatches(Address.qatar, player, BigNumber.from(46), BigNumber.from(45));
        printAllMatches(r0);
        printAllMatches(r1);
    // }

    // for (let i = 1; i <= r.length; i++) {
    //     let topN = await lens.getTopNRecords(Address.qatar, i, 0, 50);
    //     printTopNRecord(`mathch id ${i} win lose record: `, topN)

    //     topN = await lens.getTopNRecords(Address.qatar, i, 1, 50);
    //     printTopNRecord(`mathch id ${i} score guess record: `, topN)
    // }

    const wc = await ethers.getContractAt('WorldCupQatar', Address.qatar);
    // const totalMatches = await wc.totalMatches();

    // for (let i = totalMatches.toNumber(); i >= 1; i--) {
    //     const match50 = await wc.matches(i);

    //     const stat = await lens.getMatchStatistics(match50, player);
    //     console.log(`stat: ${stat}\n`)
    // }
    console.log(`totalMatches: ${await wc.totalMatches()}`);
    console.log(`\nfeeRatio:  ${await wc.feeRatio()}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
