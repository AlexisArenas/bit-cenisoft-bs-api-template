const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    bookId: { type: Schema.Types.ObjectId, required: true, ref: "books" },
    name: { type: String, required: true },
    unitValue: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
});

const Sale = mongoose.model(
    "sales",
    new Schema({
        clientId: { type: Schema.Types.ObjectId, required: true, ref: "clients" },
        items: {
            type: [itemSchema],
            required: false,
            validate: {
                validator: (val) => {
                    return Array.isArray(val) && val.length > 0;
                },
                message: (props) => "You must have at least one item to register a sale",
            },
        },
        total: { type: Number, required: true, min: 0 },
        date: { type: Date, required: false, default: Date.now },
    }, {
        timestamps: true,
    })
);

module.exports = Sale;