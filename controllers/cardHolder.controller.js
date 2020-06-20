
const CardHolder = require("../models/cardHolder");

const createCardHolder = async (req, res) => {
  const cardHolder = req.body;
  console.log("creating new cardHolder", cardHolder.cardNumber);
  try {
    const newCardHolder = await CardHolder.create(cardHolder);
    res.send(newCardHolder);
  } catch (error) {
    console.error("Error in creating new CardHolders", error);
    res.status(400).send(error);
  }
}

const getCardHolders = async (req, res) => {
  console.log("fetch all cardHolders");
  try {
    const cardHolders = await CardHolder.fetch({});
    res.send(cardHolders);
  } catch (error) {
    console.error("Error in fetchin cardHolders list", error);
    res.status(400).send(error)
  }
}

const getCardHolderById = async (req, res) => {
  const id = req.param('id');
  try {
    const cardHolder = await CardHolder.fetchById({ id });
    res.send(cardHolder);
  } catch (error) {
    console.error("Error in fetching cardHolder", id);
    res.status(400).send(error);
  }
}

module.exports = {
  createCardHolder,
  getCardHolders,
  getCardHolderById,
}
