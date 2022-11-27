# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Env files
In the frontend folder create a .env file with below contents
ESLINT_NO_DEV_ERRORS=true

DISABLE_ESLINT_PLUGIN=true

In the backend folder create a .env file with below contents
DB_HOST=127.0.0.1

DB_USER=root

DB_PASSWORD=

DB_NAME=tradeBidding

DB_PORT=3306

PORT=4000

## Running the app
Make sure you have node v16 or later installed and in frontend/ and backend/ folders do a yarn or npm install
Install mysql workbench or SQL command line and create a database called tradeBidding in it.
Run the backend using command yarn start and run the frontend using the same command as well

## Known issues/improvements
1. There is an issue with the job which runs and marks the listings as expired/shows the bid winner and hence thats logic is taken off for now
2. The bidders list is updated via setInterval calls which isn't ideal. Best way to use a PubSub mechanism using socket.io to refresh the bidders list in realtime
3. UI is very crude and needs to be fine tuned
4. Currently there is no authentication implemented for job poster role and bidder role
5. To handle concurrency and load balancing, we either can use AWS ELB if deploying this app to an AWS EC2 instance or another possible way could be
have this app running in a docker container by defining docker-compose.yml and either use docker swarm or AWS ECS/Kubernetes using the respective load balancers

