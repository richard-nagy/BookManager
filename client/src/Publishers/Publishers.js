import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPublisher, selectPublishers } from "./publishersSlice";

export default function Publishers() {
    const publisher = useSelector(selectPublishers);
    const dispatch = useDispatch();

    

    return (
        <div>
            <h1>Publishers</h1>
            <button onClick={() => dispatch(setPublisher())}>
                setPublisher
            </button>
            <br />
            <br />
            publisher: {publisher}
        </div>
    );
}
