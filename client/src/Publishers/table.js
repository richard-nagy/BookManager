import { React, useState } from "react";
import { useSelector } from "react-redux";
import { selectPublishers } from "./publishersSlice";
import Edit from "./edit";

export default function Table() {
    const [row, setRow] = useState("-");
    const publishers = useSelector(selectPublishers);

    // Unselect row
    function unselectRow() {
        setRow("-");
    }

    // Create table body
    function table() {
        var table = [];
        for (const [key, value] of Object.entries(publishers)) {
            table.push(
                <tr
                    key={key}
                    className={row === key ? "selectedRow" : ""}
                    onClick={() => {
                        setRow(key);
                    }}
                >
                    <td>{value.id}</td>
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
                        <th>Publisher</th>
                    </tr>
                    {table()}
                </tbody>
            </table>
            <Edit selectedRow={row} unselectRow={unselectRow} />
        </>
    );
}
