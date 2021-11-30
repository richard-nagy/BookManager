import { React } from "react";
import { useDispatch } from "react-redux";
import { setGenres } from "./genresSlice";

export default function Genres() {
    const dispatch = useDispatch();

    return (
        <div>
            <h1>genres</h1>
            <button onClick={() => dispatch(setGenres())}>setgenres</button>
        </div>
    );
}
