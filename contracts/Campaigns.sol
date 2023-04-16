// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

import {User, Campaign, Status, Categories} from "./Entities.sol";

contract Campaigns is Ownable {
    mapping(address => User) registeredUsers;

    function isUserActive(address _userAddress) public view returns (bool) {
        return
            registeredUsers[_userAddress].createdAt > 0 &&
            registeredUsers[_userAddress].active;
    }

    function register(
        string memory _name,
        string memory _lastname,
        string memory _email
    ) public returns (bool) {
        require(
            registeredUsers[msg.sender].createdAt == 0,
            "User already registered"
        );
        registeredUsers[msg.sender] = User({
            name: _name,
            lastname: _lastname,
            email: _email,
            createdAt: block.timestamp,
            active: true
        });
        return true;
    }
}
