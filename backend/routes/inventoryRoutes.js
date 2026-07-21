const express = require("express");
const router = express.Router();

const controller = require("../controllers/inventoryController");
const protect = require("../middleware/authMiddleware");

console.log("protect:", typeof protect);
console.log("getInventory:", typeof controller.getInventory);
console.log("createItem:", typeof controller.createItem);
console.log("deleteItem:", typeof controller.deleteItem);

router.get("/", protect, controller.getInventory);
router.post("/", protect, controller.createItem);
router.delete("/:id", protect, controller.deleteItem);

module.exports = router;