import './app.css';

const { default: axios } = require('axios');
const { useEffect, useState } = require('react');
const React = require('react');
const ReactDOM = require('react-dom');

function Book(props) {
    function handleClick() {
        props.onBookChange(props.book.id)
    }

    return (
        <button onClick={handleClick} className="w-full bg-slate-100 border border-stone-500 border-2 rounded-md">
            <h4 className="font-bold">{props.book.title}</h4>
            <p>{props.book.author}</p>
        </button>
    )
}

function BookForm(props) {
    const inputStyle = "border border-black form-input px-4 py-2 rounded-md";
    const buttonStyle = "form-input px-3 py-2 mx-1 rounded-md text-white disabled:opacity-50";
    
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (props.book) {
            setTitle(props.book.title);
            setAuthor(props.book.author);
            setDescription(props.book.description);
        } else {
            setTitle('');
            setAuthor('');
            setDescription('');
        }
    }, [props])

    function newBook() {
        axios.post('/books', { title, author, description })
            .then(response => {
                if (response.data) {
                    props.onBookAdd(response.data)
                }
            })
    }

    function editBook() {
        axios.put('/books/' + props.book.id, { title, author, description })
            .then(response => {
                if (response.data) {
                    props.onBookEdit(response.data)
                }
            })
    }

    function deleteBook() {
        axios.delete('/books/' + props.book.id)
            .then(response => {
                props.onBookDelete(props.book.id)
            })
    }

    return (
        <form className="flex flex-col space-y-3">
            <label className="flex flex-col">
                Title
                <input name="title" value={title} onChange={e => setTitle(e.target.value)} className={inputStyle} />
            </label>
            <label className="flex flex-col">
                Author
                <input name="author" value={author} onChange={e => setAuthor(e.target.value)} className={inputStyle} />
            </label>
            <label className="flex flex-col">
                Description
                <textarea name="description" value={description} onChange={e => setDescription(e.target.value)} className={inputStyle + ' h-60'} />
            </label>
            <div>
                <button onClick={newBook} type="button" className={buttonStyle + ' bg-blue-700 hover:bg-blue-900'}>Save new</button>
                <button onClick={editBook} type="button" disabled={!props.book} className={buttonStyle + ' bg-blue-700 hover:bg-blue-900'}>Save</button>
                <button onClick={deleteBook} type="button" disabled={!props.book} className={buttonStyle + ' bg-red-700 hover:bg-red-900'}>Delete</button>
            </div>
        </form>
    )
}

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
        <div className="flex flex-col p-2 sm:flex-row sm:justify-around">
            <BookForm book={getSelectedBook()} onBookAdd={addBook} onBookEdit={editBook} onBookDelete={deleteBook} />
            <div className='sm:w-6/12 mt-4'>
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