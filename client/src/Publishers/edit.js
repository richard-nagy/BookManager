import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    selectPublishers,
    updatePublisher,
    deletePublisher,
} from "./publishersSlice";
import axios from "axios";

export default function Edit({ selectedRow, unselectRow }) {
    const [row, setRow] = useState(selectedRow);

    let editValue = {};

    const publishers = useSelector(selectPublishers);
    const dispatch = useDispatch();

    useEffect(() => {
        if (publishers[row]) {
            editValue = {
                id: publishers[row].id,
                publisher: publishers[row].publisher,
            };
        }
    }, [row]);

    useEffect(() => {
        setRow(selectedRow);
    }, [selectedRow]);

    // Update publisher
    const update = async () => {
        let isDuplicate = false;
        for (const [key, value] of Object.entries(publishers)) {
            if (value.publisher === editValue.publisher) {
                isDuplicate = true;
                break;
            }
        }

        // Chcek if the texbox is empty, or if value already exists
        if (
            editValue.publisher === "" ||
            !editValue.publisher.replace(/\s/g, "").length
        ) {
            alert("Error!\nEmpty textbox.");
        } else if (isDuplicate) {
            alert("Error!\nGiven value already exists.");
        } else {
            await axios
                .put("http://localhost:3001/publishersUpdate", {
                    value: editValue,
                })
                .then(() => {
                    dispatch(
                        updatePublisher({
                            id: editValue.id,
                            publisher: editValue.publisher,
                        })
                    );
                });
        }
    };

    // Delete publisher
    const delete_ = async () => {
        await axios
            .delete("http://localhost:3001/publishersDelete", {
                data: { row: row },
            })
            .then(() => {
                unselectRow();
                dispatch(deletePublisher(row));
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
                            defaultValue={publishers[row].id}
                        />
                    </h4>
                    <h4>
                        Publisher:
                        <input
                            type="text"
                            defaultValue={publishers[row].publisher}
                            onChange={(e) =>
                                (editValue = {
                                    ...editValue,
                                    publisher: e.target.value,
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
