const HttpError = require("../models/http-error");
const Quote = require("../models/quote");
const { validationResult } = require("express-validator");
const clientInformation = require("../models/clientInformation");

let DUMMY_QUOTE = [
  {
    gallons: "2",
    address1: "123 fake street",
    address2: "456 evenFaker street",
    date: "02/20/2022",
    ppg: "2.00",
    total: "500",
    username: "taylor",
  },
];

let ACCOUNT_INFORMATION = [
  {
    full_name: "taylor kyle",
    address1: "123 changed st.",
    address2: "456 moved dr.",
    city: "Houston",
    state: "TX",
    zip: "77379",
    username: "taylor",
  },
];

exports.ACCOUNT_INFORMATION = ACCOUNT_INFORMATION;

const pricingModule = async (req, res, next) => {
  console.log(req.body)
  res.json({ppg: 1.5, total: 3});
}

const getAccountByUsername = async (req, res, next) => {
  const accountInfo = req.params.username;

  let existingUser;
  try {
    existingUser = await clientInformation.findOne({ username: accountInfo });
  } catch (err) {
    const error = new HttpError("Registration failed", 500);
    return next(error);
  }

  if (!existingUser) {
    return next(
      new HttpError(
        "Could not find account information for given username",
        404
      )
    );
  }
  res.json({ existingUser });
};

const getQuotesByUsername = async (req, res, next) => {
  //return json formatted DUMMY_QUOTE by username
  const quoteByUser = req.params.username;
  let quotes;
  try {
    quotes = await Quote.find({ username: quoteByUser });
  } catch (err) {
    return next(new HttpError("Failed to retrieve quotes", 500));
  }

  if (!quotes || quotes.length === 0) {
    return next(new HttpError("Could not find quotes for given username", 404));
  }

  res.json({ quotes });
};

const createQuote = (req, res, next) => {
  const { gallons, address1, address2, date, ppg, total, username } = req.body;

  const createQuote = new Quote({
    gallons,
    address1,
    address2,
    date,
    ppg,
    total,
    username,
  });

  if (isNaN(gallons) || gallons <= 0) {
    return next(new HttpError("Gallons must be a positive integer", 400));
  }

  if (address1 === "N/A") {
    return next(
      new HttpError("Please enter an address in account management", 400)
    );
  }
  try {
    createQuote.save();
  } catch (err) {
    return next(new HttpError("Create failed, try again", 500));
  }

  res.status(201).json({ quote: createQuote });
};

const updateAccountInformation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //console.log(errors);
    return next(new HttpError("Invalid input", 422));
  }

  const { full_name, address1, address2, city, state, zip, username } =
    req.body;

  if (full_name.length > 50) {
    return next(new HttpError("Full name must be 50 characters or less", 400));
  }

  if (address1.length > 100) {
    return next(new HttpError("Address must be 100 characters or less", 400));
  }

  if (address2.length > 100) {
    return next(new HttpError("Address must be 100 characters or less", 400));
  }

  if (city.length > 100) {
    return next(new HttpError("City must be 100 characters or less", 400));
  }

  if (zip < 10000 || zip > 999999999) {
    return next(new HttpError("Zip must be a number with 5-9 digits", 400));
  }

  let client;
  try {
    client = await clientInformation.findOne({ username: username });
  } catch (err) {
    return next("Could not retrieve client information", 404);
  }

  client.full_name = full_name;
  client.address1 = address1;
  client.address2 = address2;
  client.state = state;
  client.city = city;
  client.zip = zip;

  try {
    await client.save();
  } catch (err) {
    return next("Could not store client information", 500);
  }

  res.status(200).json({ updateAccountInformation });
};

const updateQuote = (req, res, next) => {
  const { gallons, address1, address2, date, ppg, total } = req.body;
  const userQuote = req.params.username;

  const updateQuote = { ...DUMMY_QUOTE.find((p) => p.username === userQuote) };
  const formIndex = DUMMY_QUOTE.findIndex((p) => p.username == userQuote);
  updateQuote.gallons = gallons;
  updateQuote.address1 = address1;
  updateQuote.address2 = address2;
  updateQuote.date = date;
  updateQuote.ppg = ppg;
  updateQuote.total = total;

  DUMMY_QUOTE[formIndex] = updateQuote;
  res.status(200).json({ quote: updateQuote });
};

const deleteQuote = (req, res, next) => {
  const userQuote = req.params.username;
  DUMMY_QUOTE = DUMMY_QUOTE.filter((p) => p.username !== userQuote);
  res.status(200).json({ message: "Deleted Quote" });
};

exports.getQuotesByUsername = getQuotesByUsername;
exports.createQuote = createQuote;
exports.updateQuote = updateQuote;
exports.deleteQuote = deleteQuote;
exports.updateAccountInformation = updateAccountInformation;
exports.getAccountByUsername = getAccountByUsername;
exports.pricingModule = pricingModule