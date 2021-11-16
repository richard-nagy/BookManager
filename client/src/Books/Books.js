import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTitle, selectBooks, fetchPosts } from "./booksSlice";
import axios from "axios";

export default function Books({ url }) {
    const [row, setRow] = useState("-"); // Key of the selected row

    const books = useSelector(selectBooks);
    const dispatch = useDispatch();

    const postStatus = useSelector((state) => state.books.status);

    useEffect(() => {
        if (postStatus === "idle") {
            // If url exists, its a test, if not, its a real request
            if (url) {
                dispatch(fetchPosts(url));
            } else dispatch(fetchPosts());
        }
    }, [url]);

    // Return the body of the table
    function table() {
        var text = [];
        for (const [key, value] of Object.entries(books)) {
            text.push(
                <tr
                    key={key}
                    className={row === key ? "selectedRow" : ""}
                    onClick={() => {
                        setRow(key);
                    }}
                >
                    <td>{value.id}</td>
                    <td>{value.title}</td>
                    <td>{value.author}</td>
                    <td>{value.genreID}</td>
                    <td>{value.publisherID}</td>
                </tr>
            );
        }
        return text;
    }

    let content;

    // Based on the postStatus, show the content, a lodaing message, or an error message
    if (postStatus === "loading") {
        content = <div data-testid="loading">Loading...</div>;
    } else if (postStatus === "failed") {
        content = <div>Error...</div>;
    } else if (postStatus === "succeeded") {
        content = (
            <div>
                {/* Update title of the first row */}
                <button onClick={() => dispatch(setTitle())}>setTitle</button>
                <br />
                <br />
                <table>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre ID</th>
                            <th>Publisher ID</th>
                        </tr>
                        {table()}
                    </tbody>
                </table>
                {row !== "-" && (
                    <div
                        // Whenever the key chganges, reload the textboxes
                        // with new defaultValue
                        key={row}
                    >
                        <h4>
                            ID:
                            <input
                                type="number"
                                disabled={true}
                                defaultValue={books[row].id}
                            />
                        </h4>
                        <h4>
                            Title:
                            <input
                                type="text"
                                data-testid={books[row].title}
                                defaultValue={books[row].title}
                            />
                        </h4>
                        <h4>
                            Author:
                            <input
                                type="text"
                                defaultValue={books[row].author}
                            />
                        </h4>
                        <h4>
                            Genre ID:
                            <input
                                type="text"
                                defaultValue={books[row].genreID}
                            />
                        </h4>
                        <h4>
                            Publisher ID:
                            <input
                                type="text"
                                defaultValue={books[row].publisherID}
                            />
                        </h4>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            <h1>Books</h1>
            {content}
        </div>
    );
}
