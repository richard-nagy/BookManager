import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateRow, deleteRow, selectBooks, fetchPosts } from "./booksSlice";
import axios from "axios";

const addValues = { title: "", author: "", genreID: null, publisherID: null };

export default function Books({ url }) {
    const [row, setRow] = useState("-"); // Key of the selected row
    const [textBoxes, setTextBoxes] = useState({
        id: 0,
        title: "",
        author: "",
        genreID: 0,
        publisherID: 0,
    });

    const books = useSelector(selectBooks);
    const dispatch = useDispatch();
    const postStatus = useSelector((state) => state.books.status);

    useEffect(async () => {
        if (postStatus === "idle") {
            // If url exists, its a test, if not, its a real request
            if (url) {
                dispatch(fetchPosts(url));
            } else dispatch(fetchPosts());
        }
    }, [url]);

    const update = async () => {
        // If url exists, its a test, if not, its a real request
        if (url) {
            await axios
                .put("/update", {
                    value: textBoxes,
                })
                .then(() => {
                    // If update was succesful, also update redux values
                    dispatch(updateRow(textBoxes));
                });
        } else {
            await axios
                .put("http://localhost:3001/update", {
                    value: textBoxes,
                })
                .then(() => {
                    // If update was succesful, also update redux values
                    dispatch(updateRow(textBoxes));
                });
        }
    };

    const deleteRow = async () => {
        // If url exists, its a test, if not, its a real request
        if (url) {
        } else {
            await axios
                .delete("http://localhost:3001/delete", {
                    data: { id: textBoxes.id },
                })
                .then(() => {
                    // If update was succesful, also update redux values
                    setRow("-");
                    dispatch(deleteRow(textBoxes.id));
                });
        }
    };

    const addRow = async () => {
        // If url exists, its a test, if not, its a real request
        if (url) {
        } else {
            await axios
                .post("http://localhost:3001/upload", {
                    data: addValues,
                })
                .then(() => {
                    // If update was succesful, also update redux values
                    // setRow("-");
                    // dispatch(deleteRow(textBoxes.id));
                    console.log("yep");
                });
        }
    };

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
                        setTextBoxes(value);
                    }}
                >
                    <td>{value.id}</td>
                    <td>{value.title}</td>
                    <td>{value.author}</td>
                    <td>{value.genre}</td>
                    <td>{value.publisher}</td>
                </tr>
            );
        }
        return text;
    }

    function textBoxFunc(e, column) {
        setTextBoxes({
            ...textBoxes,
            [column]: e.target.value,
        });
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
                <br />
                {row !== "-" && (
                    <fieldset
                        // Whenever the key chganges, reload the textboxes
                        // with new defaultValue
                        key={row}
                    >
                        <legend>Edit</legend>
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
                                onChange={(e) => textBoxFunc(e, "title")}
                            />
                        </h4>
                        <h4>
                            Author:
                            <input
                                type="text"
                                defaultValue={books[row].author}
                                onChange={(e) => textBoxFunc(e, "author")}
                            />
                        </h4>
                        <h4>
                            Genre ID:
                            <input
                                type="text"
                                defaultValue={books[row].genreID}
                                onChange={(e) => textBoxFunc(e, "genreID")}
                            />
                        </h4>
                        <h4>
                            Publisher ID:
                            <input
                                type="text"
                                defaultValue={books[row].publisherID}
                                onChange={(e) => textBoxFunc(e, "publisherID")}
                            />
                        </h4>
                        <button onClick={() => update()}>Update</button>
                        <button onClick={() => deleteRow()}>Delete</button>
                    </fieldset>
                )}
                <fieldset>
                    <legend>Add</legend>
                    <h4>
                        Title:
                        <input
                            type="text"
                            onChange={(e) => (addValues.title = e.target.value)}
                        />
                    </h4>
                    <h4>
                        Author:
                        <input
                            type="text"
                            onChange={(e) =>
                                (addValues.author = e.target.value)
                            }
                        />
                    </h4>
                    <h4>
                        Genre ID:
                        <input
                            type="text"
                            onChange={(e) =>
                                (addValues.genreID = e.target.value)
                            }
                        />
                    </h4>
                    <h4>
                        Publisher ID:
                        <input
                            type="text"
                            onChange={(e) =>
                                (addValues.publisherID = e.target.value)
                            }
                        />
                    </h4>
                    <button onClick={() => addRow()}>Upload</button>
                </fieldset>
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
