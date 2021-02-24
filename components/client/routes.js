const express = require("express");
const router = express.Router();
const saleRoutes = require("../sale/routes");
const {
    createClient,
    deleteClient,
    getClient,
    getClients,
    updateClient,
} = require("./actions");

// GET all
router.get("/", getClients);

// GET by ID
router.get("/:id", getClient);

// POST Create a Client
router.post("/", createClient);

// PUT Update Client's info
router.put("/:id", updateClient);

// DELETE by ID
router.delete("/:id", deleteClient);

// Implementing sales routes
router.use("/:client_id/sales", saleRoutes);

module.exports = router;