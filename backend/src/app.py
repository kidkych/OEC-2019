import os

from flask import abort, Response, request
from flask_api import FlaskAPI
from sqlobject import *

app = FlaskAPI(__name__)

DB_FILE = os.path.abspath('data.db')
DB_FILE = "sqlite:" + DB_FILE

conn = connectionForURI(DB_FILE)
sqlhub.processConnection = conn

class User(SQLObject):
    userName = StringCol()
    firstName = StringCol()
    lastName = StringCol()
    email = StringCol()
    password = StringCol()

if not User.tableExists():
    User.createTable()

@app.route("/users/add", methods=['POST'])
def add_user():
    _userName = request.data.get('userName')
    _firstName = request.data.get('firstName')
    _lastName = request.data.get('lastName')
    _email = request.data.get('email')
    _password = request.data.get('password')

    if ('' or None) in [_userName, _firstName, _lastName, _email, _password]:
        abort(Response("Ensure all fields are filled."))

    if User.select().count() != 0:
        if len(list(User.select(User.q.userName==_userName))) > 0:
            abort(Response("Username exists"))

    User(
        userName=_userName,
        firstName=_firstName,
        lastName=_lastName,
        email=_email,
        password=_password
    )

    return "User created successfully"

