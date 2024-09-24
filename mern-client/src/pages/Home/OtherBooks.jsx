import React, { useEffect, useState } from 'react'
import BookCards from '../shared/BookCards';

const OtherBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("https://book-shelf-backend-2r44.vercel.app/all-books").then(res => res.json()).then(data => setBooks(data.slice(5, 12)))
    }, [])

    return (
        <div className='mt-24'>
            <BookCards books={books} headline={"Other Books"} />
        </div>
    )
}

export default OtherBooks