import { React } from "react";
import { useSelector } from "react-redux";
import { selectPublishers } from "./publishersSlice";

export default function Publishers() {
    const publishers = useSelector(selectPublishers);

    return (
        <div>
            <h1>Publishers</h1>
            <button onClick={() => console.log(publishers)}>
                setPublisher
            </button>
        </div>
    );
}
