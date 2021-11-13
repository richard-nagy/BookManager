import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Books from "./books";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import booksSlice from "./booksSlice";
import { configureStore } from "@reduxjs/toolkit";

test("Increment by one", () => {
    render(
        <Provider store={configureStore({ reducer: { books: booksSlice } })}>
            <BrowserRouter>
                <Books />
            </BrowserRouter>
        </Provider>
    );

    fireEvent.click(screen.getByText("title0")); // keresd meg és nyomd meg a + gombot HÁROMSZOR

    expect(screen.getByTestId("title0")).toHaveValue("title0"); // legyen a szám értéke 3
});
