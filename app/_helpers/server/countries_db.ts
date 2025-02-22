import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export async function checkDatabaseConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Database connection successful!");
  } catch (error: any) {
    console.error("Database connection error:", error.message);
  }
}

checkDatabaseConnection();

const Countries = mongoose.connection.collection("countries");

// CRUD operations

// Create (Insert)
async function createCountry(country: any) {
  const { insertedId } = await Countries.insertOne(country);
  return insertedId;
}

// Read (Find)
async function getAllCountries(limit: number) {
  const countries = await Countries.find().limit(limit).toArray();

  return countries;
}

// Update
async function updateCountry(id: string, updates: any) {
  const { matchedCount, modifiedCount } = await Countries.updateOne(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: updates }
  );
  if (matchedCount === 1 && modifiedCount === 1) {
    return true;
  }
  return false;
}

// Delete
async function deleteCountry(id: string) {
  const { deletedCount } = await Countries.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  });

  if (deletedCount === 1) {
    return true;
  }
  return false;
}

async function getLatestCountry() {
  const country = await Countries.find({})
    .sort({ lastUpdated: -1 })
    .limit(1)
    .toArray();

  return country;
}

async function getCountryNames() {
  const countries = await Countries.find(
    {},
    { projection: { country: 1, _id: 0 } }
  ).toArray();

  return countries;
}

async function getCountryByID(id: mongoose.Types.ObjectId) {
  const country = await Countries.findOne({ _id: id });
  return country;
}

async function getCountryPages(page: number = 1, pageSize: number = 10) {
  const countries = await Countries.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();
  return countries;
}

async function getCountry(country: string) {
  const countryRes = await Countries.findOne({ country: country });
  return countryRes;
}

export {
  getCountry,
  getCountryNames,
  getCountryPages,
  getCountryByID,
  getLatestCountry,
  createCountry,
  getAllCountries,
  updateCountry,
  deleteCountry,
  // getAverageMetacritic,
  // getTopRatedCountries,
  // getCountryGenres,
  // getAverageMetacriticByGenre,
  // getCountryTitles,
  // filterCountriesByCriteria,
};
