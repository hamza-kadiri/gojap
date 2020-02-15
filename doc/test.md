# Integration tests
On this project we have done integration tests for socket messages, as they are on of the hardest part of the project on the backend side.

## How to run the test
You can find the test module in the backend in `server/test`. There is only one file.

- We use [pytest](https://docs.pytest.org/en/latest/) as test framework

To run the tests :
- be sure to have the database running (as they are integration tests they write data in the database), if not run `docker-compose up`
- `cd /server`
- `pipenv run tests`

You should execute all tests at the same time as they are dependant (a user should be added to a jap event before joining a table for instance)

## Tested functionnalities

Tests are written in `server/test/test_socket_server.py`. They are testing some socket messages messages all in the same way.

First we set up an environment with two users, one create a specific jap event. A "fake" socket client is intanciated to send messages with `socketio.test_client`.

In each test function :
- We send a specific message
- Check the length of the received messages (can be 0 if no message, one if one, ...)
- Check that the answer is the correct message
- Check the payload of the message contains the good values
- If needed call a service to check that data have been written correctly in the database

## Tested messages

The following list of messages is tested :
- connection
- JOIN_JAP
- JOIN_TABLE
- START_COMMAND (if emperor or not)
- JOIN_COMMAND (if command started or not)
- LEAVE_JAP