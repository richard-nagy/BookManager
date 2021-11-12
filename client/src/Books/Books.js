import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTitle, selectBooks } from "./booksSlice";

export default function Books() {
    const books = useSelector(selectBooks);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Books</h1>
            <button onClick={() => dispatch(setTitle())}>setTitle</button>
            <br />
            <br />
            title: {books.title}
        </div>
    );
}
