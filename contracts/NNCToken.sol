
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NNCToken is ERC20 {
    uint256 public constant INITIAL_BALANCE = 10_000_000 ether;

    constructor() ERC20("No Name Coder", "NNC") {
        _mint(msg.sender, INITIAL_BALANCE);
    }
}