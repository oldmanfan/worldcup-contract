import { ethers } from "hardhat";

// local NODE
// export const Address = {
//     token: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
//     wc: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
//     lens: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
// }

// HECO TEST
export const Address = {
  token: "0x6c633473FBFc289Af5B0a67FF8fb8551608967F8",
  wc: "0x0e99646814D4397934490252d228E01C963C7006",
  lens: "0xf9B0dd6ceD5e743Eed8598eEa5da54E7dE5162Cc"
}

// BSC TEST
// export const Address = {
//     token: "0x254d2Be5Cd077245E6005Ff54C7f874425d71091",
//     wc: "0xbF5411B9CF86c539312098b44C06fD9AA60FeFC2",
//     lens: "0x8D976507c2a982B7e48fCD356A13d6FE958Ca7f8"
// }

export const vault =   {
    // 测试用地址, 不要向它转账
  "address": "0x593984169bc598f877a71c386e9352755ba2ef00",
  "privateKey": "0xdd3b461c7c928b5c4bf258dceac0dd346da187a168b9f47c5b5b9a96ed2e0af7"
};


export let player1 = new ethers.Wallet("c7950f0124e0f11b08828cb8afcee1bc99e5d4b3815fec94d58a924a1e53b23d", ethers.provider);
export let player2 = new ethers.Wallet("f72d341dfd27c61968a205f3e691052a6e301dcd3a236b0cd2ef2057f247d8c4", ethers.provider);
export let player3 = new ethers.Wallet("9ed5a2048801ee52450de66409916c04296dd18feb82daa94be901f22466c8c9", ethers.provider);
