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
    "Queremos el 82% de los Desagües Pluviales de Asunción en vez de un Puente",
    "os dirigimos a ustedes como ciudadanos residentes o visitantes frecuentes de la ciudad de Asunción para expresarles nuestro hartazgo para enfrentar un día de lluvia en nuestra ciudad. Volver del trabajo en un día de lluvia es una pesadilla, tener un paraguas a nadie le salva de los raudales-arroyos en las calles y de los autos que bañan al transeúnte, además del riesgo de muerte que existe por raudales que son capaces de arrastrar no solo personas sino hasta vehículos enteros.",
    1000,
    { from: accounts[0] }
  );
  console.log("Owner campaign registered successfully");
  await campaigns.registerCampaign(
    0,
    "¡Modifiquen la ley para que nos entreguen el 30% de nuestros ahorros de las AFP!",
    "Si se modifica la ley de las AFP en República Dominicana, de los ahorros de los trabajadores en el fondo de pensiones se les podría otorgar al menos 3 a 4 salarios de su dinero ahorrado para que se pueda mitigar un poco la crisis que dejó el covid19.",
    500,
    { from: accounts[1] }
  );
  console.log("First account user campaign registered successfully");

  // Sign campaigns
  callback();
};
