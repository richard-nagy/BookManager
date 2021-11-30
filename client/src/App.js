import { React, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
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
    const postStatus = useSelector((state) => state.books.status);

    // Fetch data into redux
    useEffect(() => {
        if (postStatus === "idle") {
            dispatch(fetchBooks());
            dispatch(fetchPublishers());
            dispatch(fetchGenres());
        }
    }, []);

    return (
        <BrowserRouter>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/books">Books</Link>
                </li>
                <li>
                    <Link to="/genres">Genres</Link>
                </li>
                <li>
                    <Link to="/publishers">Publishers</Link>
                </li>
            </ul>

            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/books" component={Books} />
                <Route path="/genres" component={Genres} />
                <Route path="/publishers" component={Publishers} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
