import React from 'react';
import './App.css';

export default function Pagination({ nextPage, prevPage }) {
    return (
        <div>
            {prevPage && <button className="pagination" onClick={prevPage}>Previous</button>}
            {nextPage && <button className="pagination" onClick={nextPage}>Next</button>}
        </div>
    )
}
