// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import {User, Campaign, Status, Categories} from "./Entities.sol";

contract Campaigns is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter internal campaignId;
    uint256[] campaignIds;

    mapping(address => User) registeredUsers;
    mapping(address => uint256[]) userCampaigns;
    mapping(Categories => uint256[]) categoriesCampaigns;
    mapping(uint256 => Campaign) registeredCampaigns;
    mapping(uint256 => mapping(address => bool)) campaignSupporters;

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
            reachedAt: 0,
            supporters: new address[](0)
        });
        userCampaigns[msg.sender].push(id);
        categoriesCampaigns[_category].push(id);
        campaignIds.push(id);
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

    function getCampaignIds() public view returns (uint256[] memory) {
        return campaignIds;
    }

    function getUserCampaigns(
        address _userAddress
    ) public view returns (uint256[] memory) {
        return userCampaigns[_userAddress];
    }

    function getCategories() public pure returns (uint8[2] memory) {
        return [0, 1];
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

    function closeCampaign(uint256 _campaignId) public returns (bool) {
        Campaign memory campaign = registeredCampaigns[_campaignId];
        require(campaign.createdAt > 0, "Invalid campaign");
        require(
            msg.sender == campaign.owner || msg.sender == owner(),
            "This operation is only available for campaign owner or contract owner"
        );
        require(campaign.status != Status.CLOSED, "Campaign already closed");
        campaign.status = Status.CLOSED;
        registeredCampaigns[_campaignId] = campaign;
        emit status(
            string.concat(
                "Campaign with id ",
                Strings.toString(_campaignId),
                " closed by ",
                registeredUsers[msg.sender].name
            )
        );
        return true;
    }

    function signCampaign(uint256 _campaignId) public returns (bool) {
        require(
            isUserActive(msg.sender),
            "User must be active to sign a campaign"
        );
        Campaign memory campaign = registeredCampaigns[_campaignId];
        require(
            msg.sender != campaign.owner,
            "Campaign owner cannot sign its own campaign"
        );
        require(
            campaignSupporters[_campaignId][msg.sender] == false,
            "Campaign already signed"
        );
        require(campaign.createdAt > 0, "Invalid campaign");
        require(campaign.status == Status.OPEN, "Invalid status");
        require(campaign.category == Categories.SIGNATURE, "Invalid category");

        registeredCampaigns[_campaignId].supporters.push(msg.sender);
        campaignSupporters[_campaignId][msg.sender] = true;
        emit status(
            string.concat(
                "Campaign with id ",
                Strings.toString(_campaignId),
                " signed by ",
                registeredUsers[msg.sender].name
            )
        );
        if (campaign.supporters.length + 1 >= campaign.goal) {
            registeredCampaigns[_campaignId].status = Status.REACHED;
            registeredCampaigns[_campaignId].reachedAt = block.timestamp;
            emit status(
                string.concat(
                    "Campaign with id ",
                    Strings.toString(_campaignId),
                    " has reached the goal of ",
                    Strings.toString(campaign.goal),
                    " signatures"
                )
            );
        }
        return true;
    }

    function totalSupporters(
        uint256 _campaignId
    ) public view returns (uint256) {
        return registeredCampaigns[_campaignId].supporters.length;
    }

    function signaturesToReachGoal(
        uint256 _campaignId
    ) public view returns (uint256) {
        return
            registeredCampaigns[_campaignId].goal -
            registeredCampaigns[_campaignId].supporters.length;
    }
}
