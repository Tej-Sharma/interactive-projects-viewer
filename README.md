# Studio 42 Project Viewer

![Screenshot of the frontend](https://github.com/Trollgen-Studios/studio42-projects-viewer/blob/master/frontendScreenshot.JPG)

## Features and stack

Frontend:

- React, tailwind.css, Bootstrap
- Clean UI design with fluid UX and animations

Backend:

- MongoDB + Node/Express + Mongoose
- Code located in '/backend'

Tests:

- Unit tests as well as integration tests
- Jest / Enzyme / react-test-renderer /axios-mock-adapter


## Running the app

First, please install the required node dependencies for both the front and backend:

```
cd backend
yarn install
cd ..
yarn install
```

Then, simply startup both the frontend and the backend, and the app is good to go
```
cd backend
node server
cd ..
yarn start
```

## Important Note

For the MongoDB backend, make sure to replace the asteriked text with your own MongoDB url.
