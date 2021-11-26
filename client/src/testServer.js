import { rest } from "msw";
import { setupServer } from "msw/node";

// Test database for tests
const dataBase = {
    books: {
        0: {
            id: 1,
            title: "title1",
            author: "author1",
            genreID: 1,
            publisherID: 1,
        },
        1: {
            id: 2,
            title: "title2",
            author: "author2",
            genreID: 1,
            publisherID: 1,
        },
    },
};

const server = setupServer(
    // Select everything from the books table
    rest.get("/get", (req, res, ctx) => {
        return res(ctx.json({ books: dataBase.books }));
    }),
    // Update selected row
    rest.put("/update", (req, res, ctx) => {
        dataBase.books[req.body.value.id] = req.body.value;
        return res(ctx.json({}));
    })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };
