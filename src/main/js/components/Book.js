import React from 'react';
import { useEffect, useState } from 'react';

function Book(props) {
    function randomColor() {
        const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
        const r = randomBetween(0, 255);
        const g = randomBetween(0, 255);
        const b = randomBetween(0, 255);
        return `rgb(${r}, ${g}, ${b}, 0.2)`;
    }
    const [bookColor, setBookColor] = useState();

    useEffect(() => {
        setBookColor(randomColor())
    }, [])

    function handleClick() {
        props.onBookChange(props.book.id)
    }
    return (
        <button onClick={handleClick} style={{ backgroundColor: `${bookColor}`, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 14px 8px inset' }} className="w-full border border-stone-500 rounded-md py-1 mb-0.5">
            <h4 className="font-bold">{props.book.title}</h4>
            <p>{props.book.author}</p>
        </button>
    )
}

export default Book;