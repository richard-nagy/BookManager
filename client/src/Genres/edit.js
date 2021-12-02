import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectGenres, updateGenre, deleteGenre } from "./genresSlice";
import axios from "axios";

export default function Edit({ selectedRow, unselectRow }) {
    const [row, setRow] = useState(selectedRow);

    let editValue = {};

    const genres = useSelector(selectGenres);
    const dispatch = useDispatch();

    useEffect(() => {
        if (genres[row]) {
            editValue = {
                id: genres[row].id,
                genre: genres[row].genre,
            };
        }
    }, [row]);

    useEffect(() => {
        setRow(selectedRow);
    }, [selectedRow]);

    // Update genre
    const update = async () => {
        let isDuplicate = false;
        for (const [key, value] of Object.entries(genres)) {
            if (value.genre === editValue.genre) {
                isDuplicate = true;
                break;
            }
        }

        // Chcek if the texbox is empty, or if value already exists
        if (
            editValue.genre === "" ||
            !editValue.genre.replace(/\s/g, "").length
        ) {
            alert("Error!\nEmpty textbox.");
        } else if (isDuplicate) {
            alert("Error!\nGiven value already exists.");
        } else {
            await axios
                .put("http://localhost:3001/genresUpdate", {
                    value: editValue,
                })
                .then(() => {
                    dispatch(
                        updateGenre({
                            id: editValue.id,
                            genre: editValue.genre,
                        })
                    );
                });
        }
    };

    // Delete genre
    const delete_ = async () => {
        await axios
            .delete("http://localhost:3001/genresDelete", {
                data: { row: row },
            })
            .then(() => {
                unselectRow();
                dispatch(deleteGenre(row));
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
                            defaultValue={genres[row].id}
                        />
                    </h4>
                    <h4>
                        Genre:
                        <input
                            type="text"
                            defaultValue={genres[row].genre}
                            onChange={(e) =>
                                (editValue = {
                                    ...editValue,
                                    genre: e.target.value,
                                })
                            }
                        />
                    </h4>

                    <button onClick={() => update()}>Update</button>
                    <button onClick={() => delete_()}>Delete</button>
                </fieldset>
            )}
        </>
    );
}
