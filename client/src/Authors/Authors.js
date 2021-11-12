import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuthor, selectAuthors } from "./authorsSlice";

export default function Author() {
    const author = useSelector(selectAuthors);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Authors</h1>
            <button onClick={() => dispatch(setAuthor())}>setAuthor</button>
            <br />
            <br />
            author: {author}
        </div>
    );
}
