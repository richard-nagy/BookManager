import { React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectGenres, updateGenre } from "./genresSlice";
import axios from "axios";

export default function Add() {
    const addValue = { genre: "" };

    const genres = useSelector(selectGenres);
    const dispatch = useDispatch();

    // Add a new genbre
    const addGenre = async () => {
        let duplicate = false;
        for (const [key, value] of Object.entries(genres)) {
            if (value.genre === addValue.genre) {
                duplicate = true;
                break;
            }
        }

        // Chcek if the texbox is empty, or if value already exists
        if (
            addValue.genre === "" ||
            !addValue.genre.replace(/\s/g, "").length
        ) {
            alert("Error!\nEmpty textbox.");
        } else if (duplicate) {
            alert("Error!\nGiven value already exists.");
        } else {
            await axios
                .post("http://localhost:3001/genresUpload", {
                    data: addValue,
                })
                .then((response) => {
                    dispatch(
                        updateGenre({
                            id: response.data.insertId,
                            genre: addValue.genre,
                        })
                    );
                });
        }
    };

    return (
        <fieldset>
            <legend>Add</legend>
            <h4>
                Genre:
                <input
                    type="text"
                    onChange={(e) => (addValue.genre = e.target.value)}
                />
            </h4>
            <button onClick={() => addGenre()}>Upload</button>
        </fieldset>
    );
}
