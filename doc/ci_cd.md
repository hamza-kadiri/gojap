# Workflow & CI/CD

In order to efficiently work together as a team, and easily deploy our app continuously to a public environment, we agreed on workflow practices and set up a CI/CD server.


- [Workflow](#workflow)
- [Production environment](#production-environment)
- [CI/CD](#ci/cd)
    - [Testing](#testing)
    - [Migrating](#migrating)
    - [Deploy server](#deploy-server)
    - [Deploy client](#deploy-client)

## Workflow

In order to split the work efficiently, and have as few merge issues as possible, we used Trello to split the work to be done into the smallest bits. We then each picked up the tickets, worked on the features on separate branches, opened pull requests and reviewed them among us.

## Production environment

Our app has been deployed to a public environment to be shareable with anyone. Here are our technological choices of solutions for this.

To deploy the client app as well as the server we chose [Heroku](https://heroku.com/), an online platform to host web applications/services. We chose this mainly because it is easy to use and, most of all, free.

The production database is currently hosted on [AWS](https://aws.amazon.com/fr/), as it has a 1 year free plan including a free database instance.

The last component of our production environment is our CI/CD server. 

## CI/CD

In order for our app to be deployed automatically with the latest features, we implemented a CI/CD process on GitlabCI. This process consists of 4 stages: 
- Testing
- Migrating
- Deploy server
- Deploy client

We initially wanted to deploy the server and the client in parallel, to have a faster deploy pipeline. This was unfortunately not possible, because Heroku, which is the platform we chose to deploy our apps, does not allow for more than 1 concurrent build in its free plan.

### Testing
As opposed to the other three stages, which only execute upon merging on `master`, this one runs on all branches. It runs our test suite as well as checks that the python docstrings have been written following some predefined standards. Failure on one of these operations will prevent a pull request from being merged, hence preserving the code on `master` as clean and functional as possible.

### Migrating
In this next stage, the CI server runs the database migrations against our production database. This will allow the database to be ready for the last version of the server, deployed in the next step.

### Deploy server
This step pushes our server code to a Heroku app, where it will be deployed. There, it is deployed in an specific Python runtime, that is specified in the `server/runtime.txt` file (here, we chose `python-3.7.2` in order to be able to use the `__future__` feature). The app is then run with `gunicorn`, through a command specified in the `server/Procfile`.

### Deploy client
The same way as for the server deployment, the client is then deployed to Heroku. Once received by our Heroku app, it is recognized as a NodeJS app, and Heroku will run `yarn` and `yarn build` (using the version of Node specified in `client/.nvmrc`). Then, the client is served with the command specified in the `client/Procfile`, which is `yarn start:prod`. This will expose the built Javascript bundle.

> Note: in order for `yarn build` to correctly pick up environment variables we set up in Heroku, we needed to set up a `.env` file on the Heroku server. We wrote a quick script for that, see `client/start.sh`