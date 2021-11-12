import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import counterReducer from "./counterSlice";
import { configureStore } from "@reduxjs/toolkit";

test("Increment by one", () => {
    render(
        <Provider
            store={configureStore({ reducer: { counter: counterReducer } })}
        >
            <BrowserRouter>
                <Counter />
            </BrowserRouter>
        </Provider>
    );
    const counter = screen.getByText("0"); // keresd meg a számot
    expect(counter).toHaveTextContent("0"); // legyen a induló szám értéke 0
    for (let i = 0; i < 3; i++) {
        fireEvent.click(screen.getByText("+")); // keresd meg és nyomd meg a + gombot HÁROMSZOR
    }
    expect(counter).toHaveTextContent("3"); // legyen a szám értéke 3
});
