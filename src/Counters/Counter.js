import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, selectCount } from "./counterSlice";

export default function Counter() {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Home</h1>
            <h3 id="count">{count}</h3>
            <button
                aria-label="Decrement value"
                onClick={() => dispatch(decrement())}
            >
                -
            </button>
            <button
                aria-label="Increment value"
                onClick={() => dispatch(increment())}
            >
                +
            </button>
        </div>
    );
}
