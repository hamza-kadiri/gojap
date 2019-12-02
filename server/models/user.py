import uuid

class User:

    def __init__(self,pseudo,mail,tel):
        self.__user_id = uuid.uuid4()
        self.__pseudo = pseudo
        self.__mail = mail
        self.__tel = tel
        self.__calorie = 0

    def __str__(self):
        return f"Cet utilisateur est {self.__pseudo} et son id est {self.__user_id}."
