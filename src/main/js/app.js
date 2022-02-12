import './index.css';

import Book from './components/Book';
import BookForm from './components/BookForm';

import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
    const [books, setBooks] = useState(null);
    const [selectedBookId, setSelectedBookId] = useState(null);

    function selectBook(book) {
        setSelectedBookId(book)
    }

    function getSelectedBook() {
        if (books) {
            return books.find(x => x.id === selectedBookId);
        }
        return null;
    }

    function addBook(newBook) {
        const newBooks = [...books, newBook]

        setBooks(newBooks)
        setSelectedBookId(undefined);
    }

    function editBook(editBook) {
        const updatedBooks = books.map(x => {
            if (x.id === editBook.id) {
                return editBook
            }
            return x;
        })
        setBooks(updatedBooks)
        setSelectedBookId(undefined);
    }

    function deleteBook(bookId) {
        setBooks(books.filter(x => x.id !== bookId))
        setSelectedBookId(undefined);
    }

    const bookList = books?.map(book => (
        <li key={book.id}>
            <Book onBookChange={selectBook} book={book} />
        </li>
    ))

    useEffect(() => {
        axios.get('/books')
            .then(response => {
                setBooks(response.data);
            })
    }, []);

    return (
        <div className="flex flex-col py-8 gap-4 sm:flex-row sm:justify-around">
            <BookForm book={getSelectedBook()} onBookAdd={addBook} onBookEdit={editBook} onBookDelete={deleteBook} />
            <div className='w-full mt-4 px-4'>
                <ul>{bookList}</ul>
            </div>
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('react')
)