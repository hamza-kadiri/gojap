# DEV2019_Go_Jap

Go jap !

Table of contents

- [DEV2019_Go_Jap](#dev2019gojap)
  - [Project overview](#project-orverview)
  - [Client](#client)
    - [Overview](#overview)
    - [Used Libraries :](#used-libraries)
    - [Installation :](#installation)
  - [Backend](#backend)
    - [Overview](#overview)
    - [Install back](#install-back)
    - [Run back](#run-back)
    - [Files structure](#files-structure)
    - [Dependencies](#dependencies)
  - [Database](#database)
    - [Run database](#run-database)
    - [Run migrations (To update your database schema)](#run-migrations-to-update-your-database-schema)
  - [Architecture (different file)](/doc/architecture.md)
  - [Unit test (different file)](/doc/test.md)
  - [API (different file)](/doc/api.md)
  - [CI/CD (different file)](/doc/ci_cd.md)
  

## Project overview

Go jap is the social app you need to get the best experience when you are going to **all you can eat** japanese restaurants. It helps you to plan, manage the orders and make some fun with your friends by checking ordered items for instance.

In this repository you will fin the doc describing the project and the code for the front end (`/client`) and the backend (`/server`).

## Client

### Overview

The client has been generated by [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate).
It allows to generated a highly scalable, offline-first foundation with the best DX and a focus on performance and best practices.

### Used Libraries :

- [*Redux*](https://redux.js.org/) (for flow management)
- [*Immer*](https://immerjs.github.io/immer/docs/introduction) (for state immutability)
- [*reselect*](https://github.com/reduxjs/reselect) (for faster state tree calculation)
- [*redux-saga*](https://github.com/redux-saga/redux-saga) (mainly used for asynchronous calls)
- [*react-router*](https://github.com/ReactTraining/react-router) & [*connected-react-router*](https://github.com/supasate/connected-react-router) (for routing)
  Asynchronously loaded components
- [*material-ui*](https://material-ui.com/) (for a nice implementation of Google's Material Design guidelines)
- [*styled-components*](https://www.styled-components.com/) (allows to style React components efficiently and leverages material-ui components)

### Installation :

You need NodeJS preinstalled on your machine in order to run this project. This project has been built with v10.13.0, here's a link to installers: https://nodejs.org/ru/blog/release/v10.13.0/.


- `yarn` or `npm install` To install npm dependencies
- `yarn start` or `npm start` To run the client. The default port used is 3000.

>N.B. Our choice has been `yarn` for this project, but if you prefer using `npm` it should work all the same.

## Backend

### Overview

The backend is a python flask backend. It's dealing with http requests and socket requests. Everything is written in the `/server` folder.

### Install

- install pipenv with PYTHON 3
  
  - mac : `brew install pipenv`
  - other platforms: `pip install --user pipenv`
  - crude option: `curl https://raw.githubusercontent.com/kennethreitz/pipenv/master/get-pipenv.py | python`
- Install dependencies: 
  - `cd server/`
  - `pipenv install`


### Run the backend

> **Important note:** You need to have the database set up and running before running the server.

- `cd server/`
- run server : `pipenv run flask-dev`
- run tests : `pipenv run tests`
- run check for documentation : `pipenv run pydocstyle`

### Files Structure

```
server
  ├── helpers : utils functions
  ├── http_routes
  |   └── auth.py : route for authentification
  |   └── command.py : routes for commands
  |   └── ...
  ├── migrations : usefull for migrate the db
  ├── migration_script : usefull for migrate the db
  ├── models : usefull for migrate the db
  |   └── model.py : file containing all the db models
  ├── services
  |   └── user_service.py : service for logic on user, user creation, deletion, ...
  |   └── ...
  ├── socket_module
  |   └── socket_messages.py : enum of messages
  |   └── socket_server.py : entry point for socket
  ├── test : folder containing pytest tests
  |   └── test_socket_server.py
  ├── app.py : main file for flask server
  ├── config.py
  ├── Pipfile
```


### Dependencies
All the dependencies are written in `/server/Pipfile`.

Main dependencies are :

- *Gunicorn* : a flask runner
- *Flask* : the server http framwork
- *Flask-Cors* : flask dependency to deal with cross origin requests
- *pylint*: check code validity
- *requests*: make http requests
- *pytest*: our test framework
- *pydocstyle*: check doc formatting to be sure to have the cleanest code
- *psycopg2*: a PostgreSQL client for python (used by flask_sqlalchemy)
- *eventlet*: a Worker class compatible with sockets, used by Gunicorn
- *flask_sqlalchemy*: flask dependency to handle sql requests and models (our choice of ORM)
- *flask_jwt_extended*: flask dependency to handle authentication tokens easily
- *flask-socketio*: flask dependency enable socketio way of dealing with socket
- *Flask-Migrate*: library used to manage database migrations, using Alembic for SQLAlchemy
- *authlib*: library used to manage Oauth
- *black*: reformat the code on save to have the cleanest code


## Database
### Run database locally
- `docker-compose up`

### Run migrations (To update your database schema)
- `pipenv run upgrade`
