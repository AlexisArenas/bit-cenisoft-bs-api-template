const Sale = require("./model");

//Create a Sale
const createSale = (req, res) => {
    const newSale = new Sale(req.body);
    newSale.save((error, saleSaved) => {
        if (error) {
            console.error("Error saving sale ", error);
            res.status(500).send(error);
        } else {
            res.send(saleSaved);
        }
    });
};

//Get Sales
const getSales = (req, res) => {
    let query = req.query;
    if (req.query.name) {
        query = { name: new RegExp(`.*${req.query.name}.*`, "i") };
    }

    Sale.find(
        Object.assign({}, query, { clientId: req.params.clientId }),
        (error, sales) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.send(sales);
            }
        }
    );
};

//Get a Sale by id and clientId
const getSale = (req, res) => {
    Sale.findOne({
            _id: req.params.id,
            clientId: req.params.clientId,
        },
        (error, sale) => {
            sale
                .populate("clientId")
                .populate("items.bookId")
                .execPopulate((error, saleWithAllData) => {
                    if (error) {
                        res.status(500).send(error);
                    } else if (saleWithAllData) {
                        res.send(saleWithAllData);
                    } else {
                        res.status(404).send({});
                    }
                });
        }
    );
};

// Update a Sale
const updateSale = (req, res) => {
    Sale.updateOne({ _id: req.params.id, clientId: req.params.clientId },
        req.body,
        (error, result) => {
            if (error) {
                res.status(422).send(error);
            } else {
                res.send(result);
            }
        }
    );
};

//Delete a Sale
const deleteSale = (req, res) => {
    Sale.findOneAndDelete({
            _id: req.params.id,
            clientId: req.params.clientId,
        },
        (error, result) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(204);
            }
        }
    );
};

module.exports = { createSale, getSales, getSale, updateSale, deleteSale };