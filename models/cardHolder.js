
const Mongoose = require('mongoose');

const definition = {
  lastName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true
  },
}

const CardHolderSchema = new Mongoose.Schema(definition);

CardHolderSchema.index({ cardNumber: 1 }, { unique: true });

const CardHolderModel = Mongoose.model("cardholders", CardHolderSchema, "cardholders");

const create = async (book) => {
  try {
    const newCardHolder = await CardHolderModel.create(book);
    console.log("Successfully created new card holder", newCardHolder.cardNumber);
    return newCardHolder;
  } catch (error) {
    console.error("Error in creating new card holder", error);
    return ({
      message: "Technical Error",
      error: error.toString()
    });
  }
}

const fetch = async ({
  filter = {},
  skip = 0,
  limit = 10,
  sort = "createdAt",
  select = ""
}) => {
  try {
    console.log("filter", filter)
    const carrdHolders = await CardHolderModel.find(filter).sort(sort).skip(skip).limit(limit).select(select);
    console.log("fetched", carrdHolders.length, "carrdHolders");
    return carrdHolders;
  } catch (error) {
    console.error("Error in fetching all carrdHolders");
    return ({
      message: "Technical Error",
      error: error.toString()
    });
  }
}

const fetchById = async ({
  id,
  select = ""
}) => {
  if (!id) {
    console.error("Id not available");
    return ({
      message: "Provide Id is required"
    });
  } else {
    try {
      const cardHolder = await CardHolderModel.findById(id).select(select);
      console.log("got cardHolder", cardHolder);
      return cardHolder;
    } catch (error) {
      console.error("Error in fetching cardHolder", cardHolder);
      return ({
        message: "Technical Error.",
        error: error.toString()
      });
    }
  }
}

module.exports = {
  create,
  fetch,
  fetchById
}
