# DEV2019_Go_Jap

Go jap !

Table of contents

- [DEV2019_Go_Jap](#dev2019gojap)
  - [Client](#client)
    - [Overview](#overview)
    - [Used Libraries :](#used-libraries)
    - [Installation :](#installation)
  - [Backend](#backend)
    - [Install back](#install-back)
    - [Run back](#run-back)
    - [Run database](#run-database)
    - [Run migrations (To update your database schema)](#run-migrations-to-update-your-database-schema)
  - [API](#api)
    - [HTTP details](#http-details)
      - [Blueprint `/auth`](#blueprint-auth)
        - [POST `/login`](#post-login)
        - [`/register`](#register)
      - [Blueprint `/jap_place`](#blueprint-japplace)
        - [GET `/all`](#get-all)
        - [GET `/menu/<int:jap_place_id>`](#get-menuintjapplaceid)
      - [Blueprint `/jap_event`](#blueprint-japevent)
        - [POST `''`](#post)
        - [GET `/user/<int:user_id>`](#get-userintuserid)
        - [GET `/table/<int:table_id>`](#get-tableinttableid)
        - [GET `/upcoming/<int:user_id>`  (not so important, keep it last)](#get-upcomingintuserid-not-so-important-keep-it-last)
        - [POST `/add_members/<int:jap_event_id>`](#post-addmembersintjapeventid)
        - [PUT `<int:jap_event_id>/status/<int:status>`](#put-intjapeventidstatusintstatus)
      - [Blueprint `/table`](#blueprint-table)
        - [POST `''`](#post-1)
        - [GET `/jap_event/<int:jap_event_id>/user/<int:user_id>`](#get-japeventintjapeventiduserintuserid)
        - [POST `/add_members/<int:table_id>`](#post-addmembersinttableid)
        - [PUT `/<int:table_id>/status/<int:status>`](#put-inttableidstatusintstatus)
      - [Blueprint `/command`](#blueprint-command)
      - [Socket messages and payload](#socket-messages-and-payload)
        - [Emperor to table members](#emperor-to-table-members)
          - [START_COMMAND](#startcommand)
          - [END_COMMAND](#endcommand)
          - [NEXT_ITEM](#nextitem)
        - [User to table members](#user-to-table-members)
          - [CHOOSE_ITEM](#chooseitem)
        - [User to jap event members](#user-to-jap-event-members)
          - [JOIN_JAP](#joinjap)
          - [LEAVE_JAP](#leavejap)
          - [SEND_EVENT](#sendevent)
          - [JOIN_TABLE](#jointable)
        - [Server to table members](#server-to-table-members)
          - [COMMAND_STARTED](#commandstarted)
          - [ITEM_CHANGED](#itemchanged)
          - [COMMAND_ENDED](#commandended)
          - [ITEM_CHOSEN](#itemchosen)
        - [Server to jap event members](#server-to-jap-event-members)
          - [USER_LEFT_JAP](#userleftjap)
          - [NEW_EVENT](#newevent)
          - [USER_JOINED_TABLE](#userjoinedtable)
          - [USER_JOINED_JAP](#userjoinedjap)

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

### Run migrations (To update your database schema)
- Delete migrations folder
- `pipenv run db-init`
- `pipenv run migrate`
- `pipenv run upgrade`


## API

Possible status of command and jap:
- 0 : pending
- 1 : started
- 2 : finished

### HTTP details

#### Blueprint `/auth`

##### POST `/login` 
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

##### `/register`

USELESS NOW

#### Blueprint `/jap_place`
We must be able to :
- Get all jap places
- Get the menu of a specific jap_place

##### GET `/all` 
Get all jap places

Server response : 
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

##### GET `/menu/<int:jap_place_id>` 
```json
{ menu : [{id: name, points_amount, icon_id}, Item 2, Item 3, ....]}
```

#### Blueprint `/jap_event`
We must be able to: 
- Create a jap event
- Get all jap events concerning a user
- Get all tables associated to a jap_event
- Get upcoming japs
- Add members to a jap event
- Update a jap_event status

##### POST `''`
Create jap event

Request body : `{event_name, description, date, jap_place_id, created_by}`

Server response : (serialized JapEvent Object)
```json
{jap_event : id, event_name, description, date, jap_place_id, created_by, created_at, status, members}
```

##### GET `/user/<int:user_id>`
Get all jap_events concerning the user whose id is user_id 


Server response : 
```json
{
  jap_events: 
    [
      {id, event_name, description, date, jap_place_id, created_by, created_at, status, members}, 
      ...
    ]
}
```

##### GET `/table/<int:table_id>`
Get all tables associated to a jap_event

Server response : 
```json
{
  tables: 
    [
      Table 1, Table 2, ....
    ]
}
```

##### GET `/upcoming/<int:user_id>`  (not so important, keep it last)
Get all upcoming japs concerning the user whose id is user_id


Server response : 
```json
{
  user_jap_events: 
    [
      {id, event_name, description, date, jap_place_id, created_by, created_at, status, members}, 
      ...
    ], 
  other_jap_events: 
    [
      {id, event_name, description, date, jap_place_id, created_by, created_at, members}, 
      ...
    ]
}
```

##### POST `/add_members/<int:jap_event_id>` 
Add members to a jap event.

Request body : 
```json
{
  new_members : [id_user_1, id_user_2, id_user_3 ...]
}
```

Server response (serialized JapEvent Object)
 : 
```json
{jap_event : id, event_name, description, date, jap_place_id, created_by, created_at, members}` 
```

##### PUT `<int:jap_event_id>/status/<int:status>`
Update a jap_event status

Server response : (serialized JapEvent Object)
```json
{jap_event : id, event_name, description, date, jap_place_id, status, created_by, created_at, members}
```



#### Blueprint `/table`

We must be able to:
- Create a table
- Get a user table within a jap_event
- Add people to a table
- Update a table status

##### POST `''`
Create table

Request body : `{emperor, jap_event_id}`

Server response : (serialized Table Object)
```json
{table : {id, emperor, status, members}}
```

##### GET `/jap_event/<int:jap_event_id>/user/<int:user_id>`
Get a user table within a jap_event

Server response : 
```json
{table : {id, emperor, status, members}}
```

##### POST `/add_members/<int:table_id>` 
Add members to a jap event.

Request body : 
```json
{
  new_members : [id_user_1, id_user_2, id_user_3 ...]
}
```

Server response (serialized Table Object)
 : 
```json
{table : {id, emperor, status, members}}
```

##### PUT `/<int:table_id>/status/<int:status>`
Update a table status

Server response : (serialized Table Object)
```json
{table : {id, emperor, status, members}}
```

#### Blueprint `/command`

We must be able to:
- Create a unique command associated to a couple (table_id, item_id)
- Add user's orders to this command (amount of food ordered)
- Get all commands associated to a table
- .... Still TBD



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


