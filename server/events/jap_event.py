import uuid


class JapEvent(db.Models):

    def __init__(self, name, description, date):
        self.__name = name
        self.__description = description
        self.__date = date
        self.__jap_event_id = uuid.uuid4()

    def __str__(self):
        return f"Cet événement est le {self.__name} a la date {self.__date} avec l id {self.__jap_event_id}"

    @property
    def name(self):
        return self.__name


jap1 = JapEvent('anniv de smok', 'jap pour l\'anniv de smok', '01/01/2020')
print(jap1.name)
print(jap1)


