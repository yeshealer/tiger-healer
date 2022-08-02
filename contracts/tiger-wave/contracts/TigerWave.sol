// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract TigerWave {
    uint256 totalWaves;

    uint256 private seed;

    event NewWave(address indexed from, uint256 timestamp, string message, bool isPaid);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
        bool isPaid;
    }

    Wave[] waves;

    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("Hello, I'm writing contract");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        bool isPaid = false;

        require(
            lastWavedAt[msg.sender] + 3 minutes < block.timestamp,
            "Wait 3m"
        );

        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s has waved!", msg.sender);

        seed = (block.difficulty + block.timestamp + seed) % 100;

        console.log("Random # generated: %d", seed);

        if (seed < 50) {
            console.log("%s won!", msg.sender);

            isPaid = true;

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money that the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        waves.push(Wave(msg.sender, _message, block.timestamp, isPaid));
        emit NewWave(msg.sender, block.timestamp, _message, isPaid);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
