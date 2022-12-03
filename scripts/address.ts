import { ethers } from "hardhat";

// local NODE
// export const Address = {
//     token: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
//     wc: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
//     lens: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
// }

// HECO TEST
// export const Address = {
//   tt: "0xeb8dB6B48f9F3bA0F83967E3d9b198CAB8335334",
//   qatar: "0x947abaeBC95428c954f2B630c54c56a83B16C86A",
//   lens: "0x34DEaEFF1D932d01E2962D2628c47AC2D6182017"
// }

// BSC TEST
// export const Address = {
//     tt: "0x0bDBF5aB4E87C417292eA70947bE29CFD3018d7F",
//     qatar: "0x4e5ECDC99Dae2F29C13482F2467a4b2557B2a32C",
//     lens: "0x4C9f0825CAD89aEf3427e89af2f3B5e810a93563"
// }

// BSC TEST MetaDEX
// export const Address = {
//   tt: "0xb9ba5c1c99ac58bcb2cc2b8c51e814e4a4e122de",
//   qatar: "0x5840eb8fa17a6990fdd061d46d581741d248a3f9",
//   lens: "0xa7c2a3BDaE43fA629Be52218859bc34F0759bDFB"
// }

// BSC MAINNET
// export const Address = {
//   tt: '0x55d398326f99059fF775485246999027B3197955',
//   qatar: '0x9127F3Ddd37DF7B082f84368C71fcbc77646235E',
//   lens: '0x320d4A38A5d45946d6B6568157B844C8a19cB3f6',
// }

// HECO MAINNET
export const Address =  {
  tt: '0x86040C76AAE5CBB322364CAF8820b0E8902e97E5',
  qatar: '0xed997763d226edD1e745262a90C046fc81dFC505',
  // lens: '0x6245a750F750e79Afe183E92fc8A3a11bf873216',
  lens: '0xDBb6350a1857923aFE68177E62B423a8B1C1507E',
}

export const vault =   {
    // 测试用地址, 不要向它转账
  "address": "0x593984169bc598f877a71c386e9352755ba2ef00",
  "privateKey": "0xdd3b461c7c928b5c4bf258dceac0dd346da187a168b9f47c5b5b9a96ed2e0af7"
};


export let player1 = new ethers.Wallet("c7950f0124e0f11b08828cb8afcee1bc99e5d4b3815fec94d58a924a1e53b23d", ethers.provider);
export let player2 = new ethers.Wallet("f72d341dfd27c61968a205f3e691052a6e301dcd3a236b0cd2ef2057f247d8c4", ethers.provider);
export let player3 = new ethers.Wallet("9ed5a2048801ee52450de66409916c04296dd18feb82daa94be901f22466c8c9", ethers.provider);
