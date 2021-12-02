import { React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateRow } from "./booksSlice";
import { selectPublishers } from "../Publishers/publishersSlice";
import { selectGenres } from "../Genres/genresSlice";
import axios from "axios";

export default function Add() {
    const addValues = {
        title: "",
        author: "",
        genreID: null,
        publisherID: null,
    };

    const publishers = useSelector(selectPublishers);
    const genres = useSelector(selectGenres);
    const dispatch = useDispatch();

    // Add a new book
    const addRow = async () => {
        let isTextboxEmpty = false;
        for (const [key, value] of Object.entries(addValues)) {
            if (
                value === "" ||
                value === null ||
                !value.replace(/\s/g, "").length
            ) {
                isTextboxEmpty = true;
                break;
            }
        }

        if (isTextboxEmpty === true) {
            alert("Error!\nEmpty textbox.");
        } else {
            await axios
                .post("http://localhost:3001/booksUpload", {
                    data: addValues,
                })
                .then((response) => {
                    dispatch(
                        updateRow({
                            id: response.data.insertId,
                            title: addValues.title,
                            author: addValues.author,
                            genre: genres[addValues.genreID].genre,
                            publisher:
                                publishers[addValues.publisherID].publisher,
                        })
                    );
                });
        }
    };

    // Dropdown for genres and publishers
    function selector(object, title) {
        var options = [];
        for (const [key, value] of Object.entries(object)) {
            options.push(
                <option key={key} value={value.id}>
                    {value[title]}
                </option>
            );
        }
        return options;
    }

    return (
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
                    onChange={(e) => (addValues.author = e.target.value)}
                />
            </h4>
            <h4>
                Genre:
                <select onChange={(e) => (addValues.genreID = e.target.value)}>
                    <option value="" defaultValue hidden>
                        Choose here
                    </option>
                    {selector(genres, "genre")}
                </select>
            </h4>
            <h4>
                Publisher:
                <select
                    onChange={(e) => (addValues.publisherID = e.target.value)}
                >
                    <option value="" defaultValue hidden>
                        Choose here
                    </option>
                    {selector(publishers, "publisher")}
                </select>
            </h4>

            <button onClick={() => addRow()}>Upload</button>
        </fieldset>
    );
}
