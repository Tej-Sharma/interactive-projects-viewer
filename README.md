# Studio 42 Project Viewer - Fullstack Technical Test

My solution for the fullstack technical test.

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

As the app is fairly simple, I decided not to take the extra time to add E2E tests as the integration tests covered all of the functionalities.

## Running the app

First, please install the required node dependencies for both the front and backend:

```
cd backend
yarn install
cd ..
yarn install
```

Then, simply startup both the frontend and the backend (just make sure to start the backend before the frontend or else you will have to refresh the frontend once), and the app is good to go
```
cd backend
node server
cd ..
yarn start
```

Please feel free to contact me if any problems in the running of the app should arise.
