const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');


//environment variable
dotenv.config();
const PORT = process.env.PORT || 4040;


//initiate Application
const app = express();

// bodyParser.json() extracts the JSON data from the request body of a POST, PUT, or PATCH request
app.use(bodyParser.json());

// Definie an empty array called books
let books = [];

// express.static() method to serve static files from the public directory
app.use(express.static('public'));


//Route to serve index.html file
app.get('/', (req,res)=>{
    res.sendFile('index.html');
});

//Route to return  a json array of books

app.get('/books', (req,res)=>{

    res.json(books);

});


// add a book to the collection when a POST request is made
let bookIdCounter = 1;

app.post('/books', (req,res)=>{

    const { title, author, publishedDate } = req.body;
    const book = {
        id: bookIdCounter++,
        title,
        author,
        publishedDate
    }
    books.push(book);
    res.json(book);

});


//delete a book from the collection
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = books.findIndex(book => book.id === id)
    if (index !== -1) {
        books.splice(index, 1)
        res.json({message: ' Hello ! Book deleted successfully'})
    } else {
        res.status(404).json({message: 'Sorry ! Book not found'})
    }
});


//sever config
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});





