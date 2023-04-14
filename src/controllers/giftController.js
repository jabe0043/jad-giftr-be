const getAllGifts = async (req, res) => {
  try {
    const gifts = await Gift.find();
    res.json(gifts);
  } catch (error) {
    
  }
};

const getGiftById = async (req, res) => {};

const createGift = async (req, res) => {};

const updateGift = async (req, res) => {};

const deleteGift = async (req, res) => {};

module.exports = {
  getAllGifts,
  getGiftById,
  createGift,
  updateGift,
  deleteGift,
};
