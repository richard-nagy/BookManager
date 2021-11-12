import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import Books from "./Books/books";
import Authors from "./Authors/authors";
import Publishers from "./Publishers/publishers";
import Home from "./Home/home";

function App() {
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
                    <Link to="/authors">Authors</Link>
                </li>
                <li>
                    <Link to="/publishers">Publishers</Link>
                </li>
            </ul>

            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/books" component={Books} />
                <Route path="/authors" component={Authors} />
                <Route path="/publishers" component={Publishers} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
