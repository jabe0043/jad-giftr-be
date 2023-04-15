const debug = require("debug")("app:peopleController");

const PeopleService = require("../services/peopleService");

const Person = require("../models/personModel");

const getAllPeople = async (req, res, next) => {
  debug("getAllPeople");
  try {
    const people = await PeopleService.getAllPeople();
    res.json({ data: people });
  } catch (error) {
    next(error);
  }
};

const getPersonById = async (req, res, next) => {
  debug("getPersonById");
  try {
    const person = await PeopleService.getPersonById(req.params.id);
    res.json({ data: person });
  } catch (error) {
    next(error);
  }
};

const createPerson = async (req, res, next) => {
  debug("createPerson");
  try {
    const createdPerson = await PeopleService.createPerson(req.sanitizedBody);
    res.status(201).json({ data: createdPerson });
  } catch (error) {
    next(error);
  }
};

const updatePerson = async (req, res, next) => {
  debug("updatePerson");
  try {
    const updatedPerson = await PeopleService.updatePerson(
      req.params.id,
      req.sanitizedBody
    );
    res.status(201).json({ data: updatedPerson });
  } catch (error) {
    next(error);
  }
};

const replacePerson = async (req, res, next) => {
  debug("replacePerson");
  try {
    const replacedPerson = await PeopleService.replacePerson(
      req.params.id,
      req.sanitizedBody
    );
    res.status(201).json({ data: replacedPerson });
  } catch (error) {
    next(error);
  }
};

const deletePerson = async (req, res, next) => {
  debug("deletePerson");
  try {
    const deletedPerson = await PeopleService.deletePerson(req.params.id);
    res.status(201).json({ data: deletedPerson });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPeople,
  getPersonById,
  createPerson,
  updatePerson,
  replacePerson,
  deletePerson,
};
