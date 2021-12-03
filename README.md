# BookManager 
BookManager is simple website, created by me. Its goal is to give the user the ability to manage a database, which contains books, publishers and genres data.

---

#### How I worked on this project
- I made a visual plan on Figma: [Design Plans][Design Plans]
- I organized my tasks on Notion: [Notion Tasks][Notion Tasks]
- My commits were uploaded to the *develop* branch: [Develop Branch][Develop Branch]
- I used MySQL as a database service, the database can be imported from the bookmanager.sql file: [file][sql]
- To create a server for the database I used Express.js
- I used Redux to manage globally used values

---

#### How to navigate this project
- Example mysql requests: [books.js][books.js]
- Example fetch status message handler: [booksSlice.js][booksSlice.js]
- React-router-dom usage: [App.js][App.js]

---

#### Why I built the project this way

- My main goal was to create a website with the usage of Redux, MySQL and react-router-dom
- The websites design plan, and the website itself looks really poor, because the main focus was not on the design
- Expect for the Home, every page is split up to 4 files, with one component in each one. In my opinion, this is the best way to split up the components, and it's also better for the coordination.

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

[Design Plans]: https://www.figma.com/proto/zMBUqtUegQlwZ70dPo2LiK/Book-Manager?node-id=3%3A2&scaling=min-zoom&page-id=0%3A1 "Design Plans"
[Notion Tasks]: https://orchid-rat-c72.notion.site/fb5da56e8853408c8dea62ffe985f29b?v=98ac73f7d10945e781bbebec3fa86716 "Notion Tasks"
[Develop Branch]: https://github.com/BigRicsoo/BookManager/tree/develop "Develop Branch"
[sql]: https://github.com/BigRicsoo/BookManager/blob/main/bookmanager.sql "file"
[books.js]: https://github.com/BigRicsoo/BookManager/blob/main/server/books.js "books.js"
[booksSlice.js]: https://github.com/BigRicsoo/BookManager/blob/1de535883033e01746bc62194ef91c8108bae9c7/client/src/Books/booksSlice.js#L34 "booksSlice.js"
[App.js]: https://github.com/BigRicsoo/BookManager/blob/1de535883033e01746bc62194ef91c8108bae9c7/client/src/App.js#L32 "App.js"
