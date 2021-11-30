import React from "react";
import Books from "./books";
import Add from "./add";
import App from "../App";
import booksSlice from "./booksSlice";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import {
    render,
    screen,
    fireEvent,
    cleanup,
    waitFor,
} from "@testing-library/react";

afterEach(cleanup);

it("Books.js", async () => {
    const { getByTestId } = render(
        <Provider store={configureStore({ reducer: { books: booksSlice } })}>
            <BrowserRouter>
                <App></App>
                <Books></Books>
            </BrowserRouter>
        </Provider>
    );

    // Before getting the data expect the loading text shows up
    expect(getByTestId("loading")).toHaveTextContent("Loading...");

    // // Wait for the data to be fetched
    // // After it arrives, click the table's first row with the data
    // // Expect the data to shop up in the textbox
    // const line1 = await waitFor(() => screen.getByText("Home"));
    // fireEvent.click(line1);
    // const title1 = getByTestId("title1");
    // expect(title1).toHaveValue("title1");

    // // Change title textbox value to updatedTitle1
    // fireEvent.change(title1, {
    //     target: { value: "updatedTitle1" },
    // });
    // expect(title1).toHaveValue("updatedTitle1");

    // // Click update button and expect updatedTitle1 to be in the table
    // fireEvent.click(screen.getByText("Update"));
    // await waitFor(() =>
    //     expect(screen.getByText("updatedTitle1")).toBeInTheDocument()
    // );

    screen.debug();
});
