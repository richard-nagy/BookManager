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
