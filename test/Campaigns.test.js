const truffleAssert = require("truffle-assertions");
const Campaigns = artifacts.require("Campaigns");

contract("Campaigns tests", (accounts) => {
  let campaigns;

  before(async () => {
    campaigns = await Campaigns.deployed();
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
});
