# DEV2019_Go_Jap

Go jap !

Table of contents

1. [DEV2019_Go_Jap](#dev2019gojap)
    1. [Client](#client)
        1. [Overview](#overview)
        1. [Used Libraries :](#used-libraries)
        1. [Installation :](#installation)
    1. [Backend](#backend)
        1. [Install back](#install-back)
        1. [Run back](#run-back)
        1. [Run database](#run-database)
    1. [API](#api)
        1. [HTTP](#http)
            1. [/auth](#/auth)
                1. [/login : POST](#/login:-post)
                1. [/register : POST](#/register:-post)
            1. [/jap_event](#/jap_event)
                1. [POST](#post)
                1. [GET](#get))
                1. [/incoming GET](#/incoming:-get))
            1. [/jap_place](#/jap_event)
                1. [POST](#post)
                1. [GET](#get))
                1. [/details GET](#/detail:-get)
                1. [/add_members POST](#/add_members:-post)
        1. [Socket messages and payload](#socket-messages-and-payload)
            1. [Emperor to table members](#emperor-to-table-members)
                1. [START_COMMAND](#START_COMMAND)
                1. [END_COMMAND](#END_COMMAND)
                1. [NEXT_ITEM](#NEXT_ITEM)
            1. [User to table members](#user-to-table-members)
                1. [CHOOSE_ITEM](#CHOOSE_ITEM)
            1. [User to jap event members](#user-to-jap-members)
                1. [JOIN_JAP](#JOIN_JAP)   
                1. [LEAVE_JAP](#LEAVE_JAP)
                1. [SEND_EVENT](#SEND_EVENT)
                1. [JOIN_TABLE](#JOIN_TABLE)
            1. [Server to table members](#server-to-table-members)
                1. [COMMAND_STARTED](#COMMAND_STARTED)
                1. [ITEM_CHANGED](#ITEM_CHANGED)
                1. [COMMAND_ENDED](#COMMAND_ENDED)
                1. [ITEM_CHOSEN](#COMMAND_ENDED)
            1. [Server to jap event members](#server-to-jap-event-members)
                1. [USER_LEFT_JAP](#COMMAND_ENDED)
                1. [NEW_EVENT](#COMMAND_ENDED)
                1. [USER_JOINED_TABLE](#COMMAND_ENDED)
                1. [USER_JOINED_JAP](#COMMAND_ENDED)

## Client

### Overview

The client has been generated by [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate).
It allows to generated a highly scalable, offline-first foundation with the best DX and a focus on performance and best practices.

### Used Libraries :

- [Redux](https://redux.js.org/) (for flow management)
- [Immer](https://immerjs.github.io/immer/docs/introduction) (for state immutability)
- [reselect](https://github.com/reduxjs/reselect) (for faster state tree calculation)
- [redux-saga](https://github.com/redux-saga/redux-saga) (mainly used for asynchronous calls)
- [react-router](https://github.com/ReactTraining/react-router) & [connected-react-router](https://github.com/supasate/connected-react-router) (for routing)
  Asynchronously loaded components
- [material-ui](https://material-ui.com/) (for a nice implementation of Google's Material Design guidelines)
- [styled-components](https://www.styled-components.com/) (allows to style React components efficiently and leverages material-ui components)

### Installation :

- `yarn` To install npm dependencies
- `yarn start`To run the client. The default port used is 3000.

## Backend

### Install back

- install pipenv with PYTHON 3
  mac : `brew install pipenv`

### Run back

- `cd server/`
- run : `pipenv install`
- run `pipenv shell` if you are asked to do it
- run server : `pipenv run flask-dev`
- run tests : `pipenv run pytest`
- run check documentation : `pipenv run pydocstyle`

### Run database
- `docker-compose up`
- mac : may be usefull to update volume url to `./docker/postgres/data:/var/lib/postgresql/data`


## API

Possible status of command and jap:
- 0 : pending
- 1 : started
- 2 : finished

### HTTP details

#### `/auth`

##### `/login`: POST
Front send : `{username, email}`

Back answer : 
```json
{
  id, 
  username, 
  email, 
  phone, 
  user_japs: 
  [
    {
      id, 
      name, 
      members, 
      table:
        [
          {id, status, members}, ...], status}, 
          ...
        ]
    }
  ]
}
```

If the user is not already in the data base (no matching email), he is added to the databased and then logged in.

##### `/register`: POST

USELESS NOW

#### `/jap_event`

##### POST
Front send : `{event_name, description, date, jap_place_id, created_by}`

Back answer : `{id, event_name, description, date, jap_place_id, created_by, created_at, members}`

##### GET
Get all your japs.

Front send : 
```json
{
  user_id
}
```

Back answer : 
```json
{
  japs: 
    [
      {id, event_name, description, date, jap_place_id, created_by, created_at, members}, 
      ...
    ]
}
```

##### `/incoming` GET
Get all incoming japs. 

Front send : 
```json
{
  user_id
}
```

Back answer : 
```json
{
  your_japs: 
    [
      {id, event_name, description, date, jap_place_id, created_by, created_at, members}, 
      ...
    ], 
  other_japs: 
    [
      {id, event_name, description, date, jap_place_id, created_by, created_at, members}, 
      ...
    ]
}
```

##### `/add_members` POST
Add members to a jap id.

Front send : Nothing
```json
{
  jap_event_id,
  members : [
    {
      email
    },
    ...
  ]
}
```

Back answer : 
```json
{
  members : [
    {
      id, 
      username, 
      email, 
      phone, 
    },
    ...
  ]
}
```

#### `/jap_place`

##### GET

Front send : nothing

Back answer : 
```json
{
  jap_places : [
    {
      id, 
      name, 
      address,
      phone,
      opening_hours,
    },
    ...
  ]
}
```

##### POST
Front send: 
```json
{
  name,
  address,
  phone,
  opening_hours,
  menu : [
    {
      name,
      points,
      icon_url
    },
    ...
  ]
}
```

Back answer:
```json
{
  id, 
  name, 
  address,
  phone,
  opening_hours,
  menu
}
```

##### `/details`: GET

Front send: 
```json
{
  jap_place_id
}
```

Back answer :
```json
{
  id, 
  name, 
  address,
  phone,
  opening_hours,
  menu
}
```

#### Socket messages and payload

##### Emperor to table members
Message sended by the emperor to the table members (through the server)
###### START_COMMAND
Payload :
```json
{
  user_id,
  jap_event_id,
  table_id,
}
```
###### END_COMMAND
Payload :
```json
{
  user_id,
  jap_event_id,
  table_id,
}
```
###### NEXT_ITEM
Payload :
```json
{
  user_id,
  jap_event_id,
  table_id,
  current_item_id
}
```

##### User to table members
###### CHOOSE_ITEM
Payload :
```json
{
  user_id,
  jap_event_id,
  table_id,
  item : {
    item_id,
    amount,
  }
}
```

##### User to jap event members
###### JOIN_JAP
Payload :
```json
{
  user_id,
  jap_event_id,
}
```
###### LEAVE_JAP
Payload :
```json
{
  user_id,
  jap_event_id,
}
```
###### SEND_EVENT
Payload :
```json
{
  user_id,
  jap_event_id,
  event : {
    event_id,
    description,
    ... ?
  }
}
```
###### JOIN_TABLE
Payload :
```json
{
  user_id,
  jap_event_id,
  table_id,
}
```

##### Server to table members
###### COMMAND_STARTED
Payload :
```json
{
  jap_event_id,
  table_id,
  command : {
    command_id,
    command_status,
    command_number
  }
}
```
###### ITEM_CHANGED
Payload :
```json
{
  jap_event_id,
  table_id,
  item : {
    item_id,
    name, 
    icon_url,
  }
}
```
###### COMMAND_ENDED
Payload :
```json
{
  jap_event_id,
  table_id,
  command : {
    command_id,
    command_status,
    command_number,
    summary : [ item_id : {name, amount, icon_url}, ...]
  }
}
```
###### ITEM_CHOSEN
Payload :
```json
{
  jap_event_id,
  table_id,
  command : {
    command_id,
    command_status,
    command_number,
    summary : { item_id : {name, amount, icon_url}, ... }
  }
}
```

##### Server to jap event members
###### USER_LEFT_JAP
Payload :
```json
{
  jap_event_id,
  members : [
    {
      user_id,
      name,
    },
    ...
  ]
}
```
###### NEW_EVENT
Payload :
```json
{
  jap_event_id,
  event : {
    event_id,
    despcription,
    ...
  }
}
```
###### USER_JOINED_TABLE
Payload :
```json
{
  jap_event_id,
  table_id,
  members : [
    {
      user_id,
      name,
    },
    ...
  ],
  command : {
    command_status,
    current_item : {
      item_id,
      name,
      icon_url
    }
  }
}
```
###### USER_JOINED_JAP
Payload :
```json
{
  jap_event_id,
  members : [
    {
      user_id,
      name,
    },
    ...
  ],
  jap_event_status,
  current_command : {
    command_status,
    current_item : {
      item_id,
      name,
      icon_url
    }
  }
}
```


