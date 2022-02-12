import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
 
function BookForm(props) {
    const inputStyle = "border border-black form-input px-4 py-2 rounded-md";
    const inputErrorStyle = "border border-red-500 form-input px-4 py-2 rounded-md";
    const buttonStyle = "form-input px-3 py-2 mx-1 rounded-md text-white disabled:opacity-50";

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [showErrors, setShowErrors] = useState(false);

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

    useEffect(() => {
        setShowErrors(false);
    }, [title, author])

    function hasFilledRequiredInputs() {
        return !!title && !!author;
    }

    function newBook() {
        if (hasFilledRequiredInputs()) {
            axios.post('/books', { title, author, description })
                .then(response => {
                    if (response.data) {
                        props.onBookAdd(response.data)
                    }
                })
        } else {
            setShowErrors(true);
        }
    }

    function editBook() {
        if (hasFilledRequiredInputs()) {
            axios.put('/books/' + props.book.id, { title, author, description })
                .then(response => {
                    if (response.data) {
                        props.onBookEdit(response.data)
                    }
                })
        } else {
            setShowErrors(true);
        }
    }

    function deleteBook() {
        axios.delete('/books/' + props.book.id)
            .then(response => {
                props.onBookDelete(props.book.id)
            })
    }

    return (
        <form className="w-full px-4 flex flex-col space-y-3">
            <label className="flex flex-col">
                Title *
                <input name="title" value={title} required onChange={e => setTitle(e.target.value)} className={(!!title || !showErrors) ? inputStyle : inputErrorStyle} />
            </label>
            <label className="flex flex-col">
                Author *
                <input name="author" value={author} required onChange={e => setAuthor(e.target.value)} className={!!author || !showErrors ? inputStyle : inputErrorStyle} />
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

export default BookForm;