// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract TigerWave {
    uint256 totalWaves;

    constructor() {
        console.log("Hello, I'm writing contract");
    }

    function wave() public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
