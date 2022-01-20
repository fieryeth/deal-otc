// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FakeToken1 is ERC20 {
    constructor() ERC20("Fake Token 1", "FT1") {
        _mint(msg.sender, 10000);
    }
}

