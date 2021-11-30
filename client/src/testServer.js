import { rest } from "msw";
import { setupServer } from "msw/node";

// Test database for tests
const dataBase = {
    books: {
        1: {
            id: 1,
            title: "title1",
            author: "author1",
            genreID: 1,
            publisherID: 1,
        },
        2: {
            id: 2,
            title: "title2",
            author: "author2",
            genreID: 1,
            publisherID: 1,
        },
    },
    publishers: {
        1: {
            id: 1,
            publisher: "publisher1",
        },
        2: {
            id: 2,
            publisher: "publisher2",
        },
    },
    genres: {
        1: {
            id: 1,
            genre: "genre1",
        },
        2: {
            id: 2,
            genre: "genre2",
        },
    },
};

const server = setupServer(
    // Select everything from the books table
    rest.get("http://localhost:3001/booksSelect", (req, res, ctx) => {
        return res(ctx.json({ books: dataBase.books }));
    }),
    // Update selected row
    rest.put("/update", (req, res, ctx) => {
        dataBase.books[req.body.value.id] = req.body.value;
        return res(ctx.json({}));
    }),
    rest.get("http://localhost:3001/publishersSelect", (req, res, ctx) => {
        return res(ctx.json(dataBase.publishers));
    }),
    rest.get("http://localhost:3001/genresSelect", (req, res, ctx) => {
        return res(ctx.json({ genres: dataBase.genres }));
    })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };
