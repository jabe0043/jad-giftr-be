const debug = require("debug")("app:peopleService");
const { NotFoundError, BadRequestError } = require("../utils/errors");

const Person = require("../models/personModel");

const getAllPeople = async () => {
  const people = await Person.find();
  return people;
};

const getPersonById = async (id) => {
  const person = await Person.findById(id);
  if (!person) throw new NotFoundError(`Person is ${id} not found`);
  return person;
};

const createPerson = async (personData) => {
  const createdPerson = await Person.create(personData);
  return createdPerson;
};

const updatePerson = async (id, personData) => {
  const updatedPerson = await Person.findByIdAndUpdate(id, personData, {
    returnOriginal: false,
  });
  if (!updatedPerson) throw new NotFoundError(`Person is ${id} not found`);
  return updatedPerson;
};

const replacePerson = async (id, personData) => {
  const replacedPerson = await Person.findOneAndReplace(id, personData, {
    returnOriginal: false,
  });
  if (!replacedPerson) throw new NotFoundError(`Person is ${id} not found`);
  return replacedPerson;
};

const deletePerson = async (id) => {
  const deletedPerson = await Person.findByIdAndDelete(id);
  if (!deletedPerson) throw new NotFoundError(`Person is ${id} not found`);
  return deletedPerson;
};

module.exports = {
  getAllPeople,
  getPersonById,
  createPerson,
  updatePerson,
  replacePerson,
  deletePerson,
};
