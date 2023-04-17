const truffleAssert = require("truffle-assertions");
const Campaigns = artifacts.require("Campaigns");

contract("Campaigns tests", (accounts) => {
  let campaigns;

  before(async () => {
    campaigns = await Campaigns.deployed();
    await campaigns.register("Owner", "User", "owner@user.es");
  });

  it("Should register a new user", async () => {
    await campaigns.register("User", "Test", "user@test.es", {
      from: accounts[1],
    });
    const isActive = await campaigns.isUserActive(accounts[1]);
    assert.equal(isActive, true, "User should be activated after registered");
    await truffleAssert.fails(
      campaigns.register("User", "Test", "user@test.es", { from: accounts[1] }),
      truffleAssert.ErrorType.REVERT,
      "User already registered"
    );
  });

  it("Should deactivate an active user", async () => {
    await truffleAssert.fails(
      campaigns.deactivateUser(accounts[3], { from: accounts[2] }),
      truffleAssert.ErrorType.REVERT,
      "Ownable: caller is not the owner"
    );
    await truffleAssert.fails(
      campaigns.deactivateUser(accounts[3]),
      truffleAssert.ErrorType.REVERT,
      "Invalid user"
    );
    await campaigns.deactivateUser(accounts[1]);
    const isActive = await campaigns.isUserActive(accounts[1]);
    assert.equal(isActive, false, "User should be deactivated");
  });

  it("Should register a new campaign", async () => {
    await truffleAssert.fails(
      campaigns.registerCampaign(
        0,
        "Signature campaign",
        "Campaign description",
        1000,
        { from: accounts[2] }
      ),
      truffleAssert.ErrorType.REVERT,
      "User must be active to register a new campaign"
    );
    await campaigns.registerCampaign(
      0,
      "Signature campaign",
      "Campaign description",
      1000
    );
    const userCampaigns = await campaigns.getUserCampaigns(accounts[0]);
    assert.equal(userCampaigns.length, 1, "User should has 1 campaign created");
    const categoryCampaigns = await campaigns.getCategoryCampaigns(0);
    assert.equal(
      categoryCampaigns.length,
      1,
      "Category 0 should has 1 campaign associated"
    );
    const campaignId = Number(userCampaigns[0].toString());
    const campaign = await campaigns.getCampaign(campaignId);
    assert.equal(campaign.category, 0, "Should validate campaign category");
    assert.equal(
      campaign.title,
      "Signature campaign",
      "Should validate campaign title"
    );
    assert.equal(campaign.goal, "1000", "Should validate campaign goal");
  });

  it("Should close a campaign", async () => {
    await truffleAssert.fails(
      campaigns.closeCampaign(100),
      truffleAssert.ErrorType.REVERT,
      "Invalid campaign"
    );
    await truffleAssert.fails(
      campaigns.closeCampaign(1, { from: accounts[3] }),
      truffleAssert.ErrorType.REVERT,
      "This operation is only available for campaign owner or contract owner"
    );
    await campaigns.closeCampaign(1);
    await truffleAssert.fails(
      campaigns.closeCampaign(1),
      truffleAssert.ErrorType.REVERT,
      "Campaign already closed"
    );
    const campaign = await campaigns.getCampaign(1);
    assert.equal(campaign.status, 2, "Campaign status should be closed");
  });

  it("Should sign a campaign", async () => {
    await campaigns.registerCampaign(
      0,
      "Signature campaign",
      "Campaign description",
      1000
    );
    await truffleAssert.fails(
      campaigns.signCampaign(2, { from: accounts[2] }),
      truffleAssert.ErrorType.REVERT,
      "User must be active to sign a campaign"
    );
    await truffleAssert.fails(
      campaigns.signCampaign(2),
      truffleAssert.ErrorType.REVERT,
      "Campaign owner cannot sign its own campaign"
    );
    await campaigns.register("Account2", "Test", "account2@test.es", {
      from: accounts[2],
    });
    await campaigns.signCampaign(2, { from: accounts[2] });
    await truffleAssert.fails(
      campaigns.signCampaign(2, { from: accounts[2] }),
      truffleAssert.ErrorType.REVERT,
      "Campaign already signed"
    );
    await truffleAssert.fails(
      campaigns.signCampaign(100),
      truffleAssert.ErrorType.REVERT,
      "Invalid campaign"
    );
    await campaigns.registerCampaign(
      1,
      "Fundraising campaign",
      "Campaign description",
      5
    );
    await truffleAssert.fails(
      campaigns.signCampaign(3, { from: accounts[2] }),
      truffleAssert.ErrorType.REVERT,
      "Invalid category"
    );
    await campaigns.closeCampaign(3);
    await truffleAssert.fails(
      campaigns.signCampaign(3, { from: accounts[2] }),
      truffleAssert.ErrorType.REVERT,
      "Invalid status"
    );
    const totalSupporters = await campaigns.totalSupporters(2);
    assert.equal(
      totalSupporters.toString(),
      "1",
      "Campaign should be supported by one user"
    );
    const signaturesToReachGoal = await campaigns.signaturesToReachGoal(2);
    assert.equal(
      signaturesToReachGoal.toString(),
      "999",
      "Campaign should need 999 supporters to reach goal"
    );
  });
});
