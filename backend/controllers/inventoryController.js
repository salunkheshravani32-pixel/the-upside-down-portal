const Inventory = require("../models/Inventory");

// Get all inventory items
const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find({ user: req.user.id });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create inventory item
const createItem = async (req, res) => {
  try {
    const item = await Inventory.create({
      name: req.body.name,
      description: req.body.description,
      rarity: req.body.rarity,
      user: req.user.id,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete inventory item
const deleteItem = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);

    res.json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getInventory,
  createItem,
  deleteItem,
};