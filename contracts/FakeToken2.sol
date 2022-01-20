// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FakeToken2 is ERC20 {
    constructor() ERC20("Fake Token 2", "FT2") {
        _mint(msg.sender, 10000);
    }
}

