const debug = require("debug")("app:peopleController");

const Person = require("../models/personModel");

const getAllPeople = async (req, res, next) => {
  debug("getAllPeople");
  try {
    const people = await Person.find();
    res.json({ data: people });
  } catch (error) {
    next(error);
  }
};

const getPersonById = async (req, res) => {
  debug("getPersonById");
};

const createPerson = async (req, res) => {
  debug("createPerson");
};

const updatePerson = async (req, res) => {
  debug("updatePerson");
};

const deletePerson = async (req, res) => {
  debug("deletePerson");
};

module.exports = {
  getAllPeople,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
};
