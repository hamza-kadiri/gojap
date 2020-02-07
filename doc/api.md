# API doc


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
    - [POST `/`](#post-2)
    - [POST `/add`](#post-add)
    - [GET `/all/<int:table_id>`](#get-allinttableid)
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

## API

Possible status of command and jap:
- 0 : pending
- 1 : started
- 2 : finished

### HTTP details

#### Blueprint `/auth`

##### POST `/login` 
Front send : `{"username", "email"}`

Back answer : 
```json
{
  "id", 
  "username", 
  "email", 
  "phone", 
  "user_japs": 
  [
    {
      "id", 
      "name", 
      "members", 
      "table":
        [
          {"id", "status", "members"}, ...], "status"}, 
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
  "jap_places" : [
    {
      "id", 
      "name", 
      "address",
      "phone",
      "opening_hours",
    },
    ...
  ]
}
```

##### GET `/menu/<int:jap_place_id>` 
```json
{ 
  "menu" : 
  [
    {"id": "name", "points_amount", "icon_id"}, 
    {"id": "name", "points_amount", "icon_id"}, ....
  ]
}
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

Request body : `{"event_name", "description", "date", "jap_place_id", "creator_id:}`

Server response : (serialized JapEvent Object)
```json
{
  "jap_event" : 
    { 
      "id", "event_name", "description", "date", "jap_place_id", 
      "creator_id", "created_at", "status", "members"
    }
}
```

##### GET `/user/<int:user_id>`
Get all jap_events concerning the user whose id is user_id 


Server response : 
```json
{
  "jap_events": 
    [
      { "id", "event_name", "description", "date", "jap_place_id", 
        "creator_id", "created_at", "status", "members"
      }, 
      ...
    ]
}
```

##### GET `/table/<int:table_id>`
Get all tables associated to a jap_event

Server response : 
```json
{
  "tables": 
    [
      {"id", "emperor", "status", "members"}, 
      {"id", "emperor", "status", "members"}, 
      ....
    ]
}
```

##### GET `/upcoming/<int:user_id>`  (not so important, keep it last)
Get all upcoming japs concerning the user whose id is user_id


Server response : 
```json
{
  "user_jap_events": 
    [
      { "id", "event_name", "description", "date", "jap_place_id", 
        "creator_id", "created_at", "status", "members"
      }, 
      ...
    ], 
  "other_jap_events": 
    [
      { "id", "event_name", "description", "date", "jap_place_id", 
        "creator_id", "created_at", "status", "members"
      }, 
      ...
    ]
}
```

##### POST `/add_members/<int:jap_event_id>` 
Add members to a jap event.

Request body : 
```json
{
  "new_members" : [{"id_user" : 1}, {"id_user" : 2}, {"id_user" : 3}, ...]
}
```

Server response (serialized JapEvent Object)
 : 
```json
{ 
  "jap_event": 
    { "id", "event_name", "description", "date",    "jap_place_id", 
      "creator_id", "created_at", "status", "members"
    }
}` 
```

##### PUT `<int:jap_event_id>/status/<int:status>`
Update a jap_event status

Server response : (serialized JapEvent Object)
```json
{ 
  "id", "event_name", "description", "date", "jap_place_id", 
  "creator_id", "created_at", "status", "members"
}
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
{
  "table" : {"id", "emperor", "status", "members"}
}
```

##### GET `/jap_event/<int:jap_event_id>/user/<int:user_id>`
Get a user table within a jap_event

Server response : 
```json
{
  "table" : {"id", "emperor", "status", "members"}
}
```
##### POST `/add_members/<int:table_id>` 
Add members to a jap event.

Request body : 
```json
{
  "new_members" : [{"id_user" : 1}, {"id_user" : 2}, {"id_user" : 3}, ...]
}
```

Server response (serialized Table Object)
 : 
```json
{
  "table" : {"id", "emperor", "status", "members"}
}
```

##### PUT `/<int:table_id>/status/<int:status>`
Update a table status

Server response : (serialized Table Object)
```json
{
  "table" : {"id", "emperor", "status", "members"}
}
```
#### Blueprint `/command`

We must be able to:
- Create a unique command associated to a couple (table_id, item_id)
- Add user's orders to this command (amount of food ordered)
- Get all commands associated to a table
- .... Still TBD

##### POST `/`
Update a table status

Request body : 
```json
{"table_id", "item_id"}
```

Server response 
```json
{
  {
    "command": {
        "id"
        "item_id"
        "table_id"
        "users": [UserCommand, UserCommand ....]
    }
}}
```

##### POST `/add`
Add a new user command to the global command

Request body : 
```json
{"table_id", "item_id", "amount_ordered", "id_user}
```

If the user `user_id` has already ordered `item_id` in `table_id`, this request should update `amount_ordered`
Otherwise this request should create a new `UserCommand` entry

Server response :
```json
{
  "command": 
    {
      "id"
      "item_id"
      "table_id"
      "users": [UserCommand, UserCommand ....]
    }
}
```

##### GET `/all/<int:table_id>`
Get all commands associated to a table


Server response : (Array of serialized command objects)
```json
{
  commands : [
      {
        "id"
        "item_id"
        "table_id"
        "users": [UserCommand, UserCommand ....]
      },
      {
        "id"
        "item_id"
        "table_id"
        "users": [UserCommand, UserCommand ....]
      },
    ]
}
```

#### Socket messages and payload

##### Emperor to table members
Message sent by the emperor to the table members (through the server)
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