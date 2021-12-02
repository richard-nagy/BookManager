import { React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPublishers, updatePublisher } from "./publishersSlice";
import axios from "axios";

export default function Add() {
    const addValue = { publisher: "" };

    const publishers = useSelector(selectPublishers);
    const dispatch = useDispatch();

    // Add a new publisher
    const addPublisher = async () => {
        let isDuplicate = false;
        for (const [key, value] of Object.entries(publishers)) {
            if (value.publisher === addValue.publisher) {
                isDuplicate = true;
                break;
            }
        }

        // Chcek if the texbox is empty, or if value already exists
        if (
            addValue.publisher === "" ||
            !addValue.publisher.replace(/\s/g, "").length
        ) {
            alert("Error!\nEmpty textbox.");
        } else if (isDuplicate) {
            alert("Error!\nGiven value already exists.");
        } else {
            await axios
                .post("http://localhost:3001/publishersUpload", {
                    data: addValue,
                })
                .then((response) => {
                    dispatch(
                        updatePublisher({
                            id: response.data.insertId,
                            publisher: addValue.publisher,
                        })
                    );
                });
        }
    };

    return (
        <fieldset>
            <legend>Add</legend>
            <h4>
                Publisher:
                <input
                    type="text"
                    onChange={(e) => (addValue.publisher = e.target.value)}
                />
            </h4>
            <button onClick={() => addPublisher()}>Upload</button>
        </fieldset>
    );
}
