# [Kisso Industries](https://www.kissohq.com) - Full Stack technical test

This test is a part of our hiring process at Kisso for Full Stack Engineers.

**Feel free to apply! Drop us a line with your LinkedIn/GitHub/Twitter at squad@kissohq.com**

# Instructions

Both **Frontend** and **Backend** tests should be done.

## Submission

Choose between one of these two solutions for the submission.

### Fork & Pull Request

1. Fork the repository at [https://github.com/KissoHQ/fullstack-test](https://github.com/KissoHQ/fullstack-test)

2. Work on your proposed solution in your fork, following the provided skeleton setup

3. Once your code is read, submit your solution as a pull request

### Clone & Submit the repo link

1. Clone the repository at [https://github.com/KissoHQ/fullstack-test](https://github.com/KissoHQ/fullstack-test)

2. Create your own repository from it

3. Work on your proposed solution in your repository, following the provided skeleton setup

4. Once your code is ready, send us the link to your repository

## Time allotted for completion

There aren’t any formal requirements for how long this challenge should take you, complete it in ten minutes or ten hours, it’s up to you. We suggest keeping it to a maximum of eight hours.

---

# Frontend

## Summary

The goal of this test is to make you code a small ReactJS app. We have prepared a [create-react-app](https://create-react-app.dev/) app for you, but please change whatever you want (CSS files, HTML structure, JS structure...).

---

Studio42 is a company that has worked with different partners in Africa.
They would like to showcase on a map the projects they have worked on.

The app will have just one page, the one showcasing the projects on the map.

- By default the map should be a simple representation of the African continent with the countries' borders highlighted, nothing else.

- Clicking on a country should open a tooltip connected to the selected country, listing the projects (the company and the project's description) for that country.

- Clicking outside an opened tooltip, should close it right away.

- You cannot have multiple tooltip opened at the same time.
  In addition to the map, there should be on the page a way to filter the projects in the tooltips by the kind of service provided (Strategy, Infrastructure, Engineering, Design). So if the service `Engineering` is selected, only Engineering project should be visible when a country's projects are displayed.

To give you an idea, here is an example of what the Map could look like:

![map](/doc/map.jpg)

## Data

In the `data` repository at the root of the project, you'll find three json files holding the data. You can use the json files as a database replacement.

- projects
- countries
- services

## Installation

We're using [yarn](https://yarnpkg.com) here:

```
yarn install
yarn start
```

## Stack

- [create-react-app](https://create-react-app.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Requirements

- use the [react-simple-maps](https://www.react-simple-maps.io/}) map component
- Responsive UI
- Unit tests

## Bonus

- Integration/E2E tests
- Nice UI/UX
- Impress us!

---

# Backend

## Summary

The goal of this test is to make you code a small Express.js app. We have prepared a minimal express app for you, you'll find it at the root of the repository `/server/`, but please change whatever you want.

---

Update both the React and the Express app so that the data are now handled and provided by the backend app instead of the Json files. The data should be store in a database (PostgreSQL or mongoDB), you are free to decide how the database schema should be structured.

## Stack

- [Express.js](https://expressjs.com/)
- [TypeORM](https://typeorm.io/) + PostgreSQL `or` [mongoose](https://mongoosejs.com/) + MongoDB

## Bonus

- Impress us!
