
const Mongoose = require('mongoose');

const definition = {
  cardHolder: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "cardholders"
  },
  book: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "books"
  }
}

const Rentalchema = new Mongoose.Schema(definition);

Rentalchema.index({ cardHolder: 1 });
Rentalchema.index({ book: 1 });

const RentalModel = Mongoose.model("rentals", Rentalchema, "rentals");

const create = async (rental) => {
  try {
    const newRental = await RentalModel.create(rental);
    console.log("Successfully created new rental document", newRental.cardHolder.cardNumber);
    return newRental;
  } catch (error) {
    console.error("Error in creating new rental document", error);
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
    const rentals = await RentalModel.find(filter).populate('book cardHolder').sort(sort).skip(skip).limit(limit).select(select);
    console.log("fetched", rentals.length, "rentals");
    return rentals;
  } catch (error) {
    console.error("Error in fetching all rentals");
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
      const rental = await RentalModel.findById(id).populate('book cardHolder').select(select);
      console.log("got rental", rental);
      return rental;
    } catch (error) {
      console.error("Error in fetching rental", rental);
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
