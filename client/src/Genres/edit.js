import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectGenres, updateGenre, deleteGenre } from "./genresSlice";
import axios from "axios";

export default function Edit({ selectedRow, unselectRow }) {
    const [row, setRow] = useState(selectedRow);

    let editValues = {};

    const genres = useSelector(selectGenres);
    const dispatch = useDispatch();

    useEffect(() => {
        if (genres[row]) {
            editValues = {
                id: genres[row].id,
                genre: genres[row].genre,
            };
        }
    }, [row]);

    useEffect(() => {
        setRow(selectedRow);
    }, [selectedRow]);

    // Update row
    const update = async () => {
        await axios
            .put("http://localhost:3001/genresUpdate", {
                value: editValues,
            })
            .then(() => {
                dispatch(
                    updateGenre({
                        id: editValues.id,
                        genre: editValues.genre,
                    })
                );
            });
    };

    // Delete row
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
                                (editValues = {
                                    ...editValues,
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
