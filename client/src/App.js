import { React, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Books from "./Books/books";
import Genres from "./Genres/genres";
import Publishers from "./Publishers/publishers";
import Home from "./Home/home";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "./Books/booksSlice";
import { fetchPublishers } from "./Publishers/publishersSlice";
import { fetchGenres } from "./Genres/genresSlice";

function App() {
    const dispatch = useDispatch();
    const postStatus = useSelector((state) => [
        state.books.status,
        state.genres.status,
        state.publishers.status,
    ]);

    // Fetch data into redux
    useEffect(() => {
        if (postStatus.includes("idle")) {
            dispatch(fetchBooks());
            dispatch(fetchPublishers());
            dispatch(fetchGenres());
        }
    }, []);

    return (
        <BrowserRouter>
            <ul>
                <li>
                    <NavLink to="/" exact={true}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/books">Books</NavLink>
                </li>
                <li>
                    <NavLink to="/genres">Genres</NavLink>
                </li>
                <li>
                    <NavLink to="/publishers">Publishers</NavLink>
                </li>
            </ul>
            <div id="body">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/books" component={Books} />
                    <Route path="/genres" component={Genres} />
                    <Route path="/publishers" component={Publishers} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
