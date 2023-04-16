// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

struct User {
    string name;
    string lastname;
    string email;
    bool active;
}

enum Categories {
    SIGNATURE,
    FUNDRAISING
}

enum Status {
    OPEN,
    REACHED,
    CLOSED
}

struct Campaign {
    Categories category;
    Status status;
    address owner;
    string title;
    string description;
    uint256 goal;
    uint256 createdAt;
    uint256 reachedAt;
}
