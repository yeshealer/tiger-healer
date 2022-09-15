// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract TigerNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokesIds;

    constructor() ERC721 ("TigerNFT", "TIGER") {
        console.log("This is my NFT contract. Whao!");
    }

    function makeAnTigerNFT() public {
        uint256 newItemId = _tokesIds.current();

        _safeMint(msg.sender, newItemId);

        _setTokenURI(newItemId, "https://imgur.com/RmJjSdc");

        _tokesIds.increment();

        console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
    }
}