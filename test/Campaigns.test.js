const truffleAssert = require("truffle-assertions");
const Campaigns = artifacts.require("Campaigns");

contract("Campaigns tests", (accounts) => {
  let campaigns;

  before(async () => {
    campaigns = await Campaigns.deployed();
  });

  it("Should register a new user", async () => {
    await campaigns.register("User", "Test", "user@test.es");
    const isActive = await campaigns.isUserActive(accounts[0]);
    assert.equal(isActive, true, "User should be activated after registered");
    await truffleAssert.fails(
      campaigns.register("User", "Test", "user@test.es"),
      truffleAssert.ErrorType.REVERT,
      "User already registered"
    );
  });
});
