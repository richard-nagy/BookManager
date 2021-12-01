import { React, useState } from "react";
import { useSelector } from "react-redux";
import { selectGenres } from "./genresSlice";
import Edit from "./edit";

export default function Table() {
    const [row, setRow] = useState("-");
    const genres = useSelector(selectGenres);

    // Unselect row
    function unselectRow() {
        setRow("-");
    }

    // Create table body
    function table() {
        var table = [];
        for (const [key, value] of Object.entries(genres)) {
            table.push(
                <tr
                    key={key}
                    className={row === key ? "selectedRow" : ""}
                    onClick={() => {
                        setRow(key);
                    }}
                >
                    <td>{value.id}</td>
                    <td>{value.genre}</td>
                </tr>
            );
        }
        return table;
    }

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Genre</th>
                    </tr>
                    {table()}
                </tbody>
            </table>
            <Edit selectedRow={row} unselectRow={unselectRow} />
        </>
    );
}
