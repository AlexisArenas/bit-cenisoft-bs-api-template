const Client = require("./model");

const getClient = (req, res) => {
    Client.findById(req.params.id, (error, client) => {
        if (error) {
            res.status(404).send(error);
        } else {
            res.send(client);
        }
    });
};

const getClients = (req, res) => {
    let query = req.query;
    if (req.query.name) {
        query = { name: new RegExp(`.*${req.query.name}.*`, "i") };
    }

    Client.find(query, (error, clients) => {
        if (error) {
            res.status(404).send(error);
        } else {
            res.send(clients);
        }
    });
};

const createClient = (req, res) => {
    const newClient = new Client(req.body);
    newClient.save((error, clientSaved) => {
        if (error) {
            console.error("Error saving client ", error);
            res.status(500).send(error);
        } else {
            res.send(clientSaved);
        }
    });
};

const updateClient = (req, res) => {
    Client.updateOne({ _id: req.params.id }, req.body, (error, result) => {
        if (error) {
            res.status(422).send(error);
        } else {
            res.send(result);
        }
    });
};

const deleteClient = (req, res) => {
    Client.findByIdAndDelete(req.params.id, (error, result) => {
        if (error) {
            res.status(422).send(error);
        } else {
            res.status(204);
        }
    });
};

module.exports = {
    getClient,
    getClients,
    createClient,
    updateClient,
    deleteClient,
};