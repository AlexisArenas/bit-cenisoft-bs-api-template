const Book = require('./model')

const createBook = (req, res) => {
    const newBook = new Book(req.body)
    newBook.save((error, bookSaved) => {
        if (error) {
            res.status(422).send(error)
        } else {
            res.status(201).send(bookSaved)
        }
    })
}

const deleteBook = (req, res) => {
    Book.findByIdAndDelete(req.params.id, (error, result) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(204)
        }
    })
}

const getBook = (req, res) => {
    Book.findById(req.params.id, (error, book) => {
        if (error) {
            res.status(500).send(error)
        } else if (book) {
            res.send(book)
        } else {
            res.status(404).send({})
        }
    })
}

const getBooks = (req, res) => {
    let query = req.query
    if (req.query.name) {
        query = { name: new RegExp(`.*${req.query.name}.*`, 'i') }
    }

    Book.find(query, (error, books) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.send(books)
        }
    })
}

const updateBook = (req, res) => {
    Book.updateOne({ _id: req.params.id }, req.body, (error, result) => {
        if (error) {
            res.status(422).send(error)
        } else {
            res.send(result)
        }
    })
}

module.exports = { createBook, deleteBook, getBook, getBooks, updateBook }