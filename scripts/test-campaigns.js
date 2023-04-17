/*
  Try `truffle exec scripts/test-campaigns.js`, you should `truffle migrate` first.
  Learn more about Truffle external scripts: 
  https://trufflesuite.com/docs/truffle/getting-started/writing-external-scripts
*/

const Campaigns = artifacts.require("Campaigns");

module.exports = async function (callback) {
  const campaigns = await Campaigns.deployed();

  // Register users
  const accounts = await web3.eth.getAccounts();
  await campaigns.register("Owner", "User", "owner@user.es", {
    from: accounts[0],
  });
  console.log("Owner user registered successfully");
  await campaigns.register("First Account", "User", "firstaccount@user.es", {
    from: accounts[1],
  });
  console.log("First account user registered successfully");

  // Register campaigns
  await campaigns.registerCampaign(
    0,
    "Signature owner's campaign",
    "Campaign description",
    1000,
    { from: accounts[0] }
  );
  console.log("Owner campaign registered successfully");
  await campaigns.registerCampaign(
    0,
    "Signature first account user's campaign",
    "Campaign description",
    500,
    { from: accounts[1] }
  );
  console.log("First account user campaign registered successfully");

  // Sign campaigns
  callback();
};
