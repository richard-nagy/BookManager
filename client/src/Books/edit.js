import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateRow, selectBooks, deleteRow } from "./booksSlice";
import { selectPublishers } from "../Publishers/publishersSlice";
import { selectGenres } from "../Genres/genresSlice";
import axios from "axios";

export default function Edit({ selectedRow, unselectRow }) {
    const [row, setRow] = useState(selectedRow);

    let reduxValues = { genre: "", publisher: "" };
    let editValues = {};

    const books = useSelector(selectBooks);
    const publishers = useSelector(selectPublishers);
    const genres = useSelector(selectGenres);
    const dispatch = useDispatch();

    // Get id of genres and publishers
    function getID(object, title) {
        for (let i = 1; i < Object.keys(object).length + 1; i++) {
            if (object[i][title] === books[row][title]) {
                return object[i].id;
            }
        }
    }

    useEffect(() => {
        if (books[row] && publishers && genres) {
            let publisherID = getID(publishers, "publisher");
            let genreID = getID(genres, "genre");

            editValues = {
                id: books[row].id,
                title: books[row].title,
                author: books[row].author,
                genreID: genreID,
                publisherID: publisherID,
            };

            reduxValues.genre = genres[genreID].genre;
            reduxValues.publisher = publishers[publisherID].publisher;
        }
    }, [row]);

    useEffect(() => {
        setRow(selectedRow);
    }, [selectedRow]);

    // Set editvalues
    function setEditValues(e, column) {
        editValues = {
            ...editValues,
            [column]: e.target.value,
        };
    }

    // Dropdown for genres and publishers
    function selector(object, title) {
        var text = [];
        for (const [key, value] of Object.entries(object)) {
            text.push(
                <option key={key} value={value.id}>
                    {value[title]}
                </option>
            );
        }
        return text;
    }

    // Update row
    const update = async () => {
        await axios
            .put("http://localhost:3001/booksUpdate", {
                value: editValues,
            })
            .then(() => {
                dispatch(
                    updateRow({
                        id: editValues.id,
                        title: editValues.title,
                        author: editValues.author,
                        genre: reduxValues.genre,
                        publisher: reduxValues.publisher,
                    })
                );
            });
    };

    // Delete row
    const delete_ = async () => {
        await axios
            .delete("http://localhost:3001/booksDelete", {
                data: { row: row },
            })
            .then(() => {
                unselectRow();
                dispatch(deleteRow(row));
            });
    };

    return (
        <>
            {row !== "-" && (
                <fieldset key={row}>
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
                            onChange={(e) => setEditValues(e, "title")}
                        />
                    </h4>
                    <h4>
                        Author:
                        <input
                            type="text"
                            defaultValue={books[row].author}
                            onChange={(e) => setEditValues(e, "author")}
                        />
                    </h4>
                    <h4>
                        Genre:
                        <select
                            onChange={(e) => {
                                setEditValues(e, "genreID");
                                reduxValues.genre =
                                    genres[e.target.value].genre;
                            }}
                        >
                            <option value="" hidden defaultValue>
                                {books[row].genre}
                            </option>
                            {selector(genres, "genre")}
                        </select>
                    </h4>
                    <h4>
                        Publisher:
                        <select
                            onChange={(e) => {
                                setEditValues(e, "publisherID");
                                reduxValues.publisher =
                                    publishers[e.target.value].publisher;
                            }}
                        >
                            <option value="" hidden defaultValue>
                                {books[row].publisher}
                            </option>
                            {selector(publishers, "publisher")}
                        </select>
                    </h4>

                    <button onClick={() => update()}>Update</button>
                    <button onClick={() => delete_()}>Delete</button>
                </fieldset>
            )}
        </>
    );
}
