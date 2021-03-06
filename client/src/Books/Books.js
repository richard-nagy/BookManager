import { React } from "react";
import { useSelector } from "react-redux";
import Add from "./add";
import Table from "./table";

export default function Books() {
    const postStatus = useSelector((state) => [
        state.books.status,
        state.genres.status,
        state.publishers.status,
    ]);

    // Based on the status return a status message, or the elements
    let content;
    if (postStatus.includes("loading")) {
        content = <div data-testid="loading">Loading...</div>;
    } else if (postStatus.includes("failed")) {
        content = <div>Error...</div>;
    } else if (postStatus.includes("succeeded")) {
        content = (
            <div>
                <Table />
                <Add />
            </div>
        );
    }

    return (
        <div>
            <h1>Books</h1>
            {content}
        </div>
    );
}
