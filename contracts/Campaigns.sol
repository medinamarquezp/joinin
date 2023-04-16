// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import {User, Campaign, Status, Categories} from "./Entities.sol";

contract Campaigns is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter internal campaignId;

    mapping(address => User) registeredUsers;
    mapping(address => uint256[]) userCampaigns;
    mapping(Categories => uint256[]) categoriesCampaigns;
    mapping(uint256 => Campaign) registeredCampaigns;

    event status(string _message);

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

    function deactivateUser(
        address _userAddress
    ) public onlyOwner returns (bool) {
        require(isUserActive(_userAddress), "Invalid user");
        registeredUsers[_userAddress].active = false;
        return true;
    }

    function getNextCampaignId() internal returns (uint256) {
        campaignId.increment();
        return campaignId.current();
    }

    function registerCampaign(
        Categories _category,
        string memory _title,
        string memory _description,
        uint256 _goal
    ) public returns (uint256) {
        require(
            isUserActive(msg.sender),
            "User must be active to register a new campaign"
        );
        uint256 id = getNextCampaignId();
        registeredCampaigns[id] = Campaign({
            category: _category,
            status: Status.OPEN,
            owner: msg.sender,
            title: _title,
            description: _description,
            goal: _goal,
            createdAt: block.timestamp,
            reachedAt: 0
        });
        userCampaigns[msg.sender].push(id);
        categoriesCampaigns[_category].push(id);
        emit status(
            string.concat(
                "New campaign created by ",
                registeredUsers[msg.sender].name,
                " with ID ",
                Strings.toString(id)
            )
        );
        return id;
    }

    function getUserCampaigns(
        address _userAddress
    ) public view returns (uint256[] memory) {
        return userCampaigns[_userAddress];
    }

    function getCategoryCampaigns(
        Categories _category
    ) public view returns (uint256[] memory) {
        return categoriesCampaigns[_category];
    }

    function getCampaign(
        uint256 _campaignId
    ) public view returns (Campaign memory) {
        return registeredCampaigns[_campaignId];
    }
}
