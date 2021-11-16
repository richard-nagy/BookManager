import React from "react";
import Books from "./books";
import axiosMock from "axios";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import booksSlice from "./booksSlice";
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

test("Books.js", async () => {
    // Mock data
    axiosMock.get.mockResolvedValueOnce({
        data: {
            books: {
                1: {
                    id: 1,
                    title: "title1",
                    author: "author1",
                    genreID: 1,
                    publisherID: 1,
                },
            },
        },
    });

    const url = "/books";
    const { getByTestId } = render(
        <Provider store={configureStore({ reducer: { books: booksSlice } })}>
            <BrowserRouter>
                <Books url={url} />
            </BrowserRouter>
        </Provider>
    );

    // Before getting the data expect the loading text shows up
    expect(getByTestId("loading")).toHaveTextContent("Loading...");

    // Wait for the data to be fetched
    // After it arrives, click the table's first row with the data
    // Expect the data to shop up in the textbox
    const line1 = await waitFor(() => screen.getByText("author1"));
    fireEvent.click(line1);
    expect(getByTestId("title1")).toHaveValue("title1");

    // Check how many times the mock request has been called
    expect(axiosMock.get).toHaveBeenCalledTimes(1);

    screen.debug();
});
