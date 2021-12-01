import { React, useState } from "react";
import { useSelector } from "react-redux";
import { selectBooks } from "./booksSlice";
import Edit from "./edit";

export default function Table() {
    const [row, setRow] = useState("-");
    const books = useSelector(selectBooks);

    // Unselect row
    function unselectRow() {
        setRow("-");
    }

    // Create table body
    function table() {
        var table = [];
        for (const [key, value] of Object.entries(books)) {
            table.push(
                <tr
                    key={key}
                    className={row === key ? "selectedRow" : ""}
                    onClick={() => {
                        setRow(key);
                    }}
                >
                    <td>{value.id}</td>
                    <td>{value.title}</td>
                    <td>{value.author}</td>
                    <td>{value.genre}</td>
                    <td>{value.publisher}</td>
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
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre ID</th>
                        <th>Publisher ID</th>
                    </tr>
                    {table()}
                </tbody>
            </table>
            <Edit selectedRow={row} unselectRow={unselectRow} />
        </>
    );
}
