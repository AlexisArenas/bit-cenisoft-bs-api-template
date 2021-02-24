const express = require("express");
const router = express.Router();
const {
    createSale,
    getSales,
    getSale,
    updateSale,
    deleteSale,
} = require("./actions");

// GET all Sales
router.get("/", getSales);

// GET Sale by ID
router.get("/:id", getSale);

// POST Create a Sale
router.post("/", createSale);

// PUT Update Sale's info
router.put("/:id", updateSale);

// DELETE by ID
router.delete("/:id", deleteSale);

module.exports = router;