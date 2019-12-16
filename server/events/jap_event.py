"""Event for a JapEvent."""

import uuid


class JapEvent(db.Models):
    """Class represents JapEvents."""

    def __init__(self, name, description, date):
        """Create a JapEvent."""
        self.__name = name
        self.__description = description
        self.__date = date
        self.__jap_event_id = uuid.uuid4()

    def __str__(self):
        """Stringify the JapEvent."""
        return f"Cet événement est le {self.__name} a la date {self.__date} avec l id {self.__jap_event_id}"

    @property
    def name(self):
        """Link property to different name."""
        return self.__name
