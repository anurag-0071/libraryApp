
const Rental = require("../models/rental");

const createRental = async (req, res) => {
  const rental = req.body;
  console.log("creating new rental", rental.cardNumber);
  try {
    const newRental = await Rental.create(rental);
    res.send(newRental);
  } catch (error) {
    console.error("Error in creating new Rentals", error);
    res.status(400).send(error);
  }
}

const getRentals = async (req, res) => {
  console.log("fetch all rentals");
  try {
    const rentals = await Rental.fetch({});
    res.send(rentals);
  } catch (error) {
    console.error("Error in fetchin rentals list", error);
    res.status(400).send(error)
  }
}

const getRentalById = async (req, res) => {
  const id = req.param('id');
  try {
    const rental = await Rental.fetchById({ id });
    res.send(rental);
  } catch (error) {
    console.error("Error in fetching rental", id);
    res.status(400).send(error);
  }
}

module.exports = {
  createRental,
  getRentals,
  getRentalById,
}
