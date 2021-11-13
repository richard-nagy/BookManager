import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTitle, selectBooks } from "./booksSlice";

export default function Books() {
    const [row, setRow] = useState("-");

    const books = useSelector(selectBooks);
    const dispatch = useDispatch();

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

    return (
        <div>
            <h1>Books</h1>
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
                <div key={row}>
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
                        <input type="text" defaultValue={books[row].author} />
                    </h4>
                    <h4>
                        Genre ID:
                        <input type="text" defaultValue={books[row].genreID} />
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
