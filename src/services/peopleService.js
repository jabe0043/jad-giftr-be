const debug = require("debug")("app:peopleService");
const { NotFoundError, BadRequestError } = require("../utils/errors");

const Person = require("../models/personModel");

const getAllPeople = async (ownerID) => {
  debug("getAllPeople");
  const people = await Person.find({ ownerID });
  return people;
};

const getPersonById = async (id, ownerID) => {
  debug("getPersonById");
  const person = await Person.findOne({ _id: id, ownerID: ownerID });
  if (!person) throw new NotFoundError(`Person ${id} is not found`);
  return person;
};

const createPerson = async (personData) => {
  debug("createPerson");
  const createdPerson = await Person.create(personData);
  return createdPerson;
};

const updatePerson = async (id, ownerID, personData) => {
  debug("updatePerson");
  const updatedPerson = await Person.findOneAndUpdate(
    { _id: id, ownerID: ownerID },
    personData,
    {
      returnOriginal: false,
    }
  );
  if (!updatedPerson) throw new NotFoundError(`Person with id ${id} not found`);
  return updatedPerson;
};

const replacePerson = async (id, ownerID, personData) => {
  debug("replacePerson");
  const replacedPerson = await Person.findOneAndReplace(
    { _id: id, ownerID: ownerID },
    personData,
    {
      returnOriginal: false,
    }
  );
  if (!replacedPerson) throw new NotFoundError(`Person is ${id} not found`);
  return replacedPerson;
};

const deletePerson = async (id, ownerID) => {
  debug("deletePerson");
  const deletedPerson = await Person.findOneAndDelete({
    _id: id,
    ownerID: ownerID,
  });
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
