const getAllPeople = async (req, res) => {
  try {
    const people = await Person.find();
    res.json({ data: people });
  } catch (error) {
    next(error);
  }
};

const getPersonById = async (req, res) => {};

const createPerson = async (req, res) => {};

const updatePerson = async (req, res) => {};

const deletePerson = async (req, res) => {};

module.exports = {
  getAllPeople,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
};
