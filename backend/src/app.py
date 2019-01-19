import os
import datetime

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

class Patient(SQLObject):
    user = ForeignKey('User')
    ward = IntCol()
    admission = TimestampCol()
    discharge = TimestampCol(default=None)
    notes = StringCol(default=None)
    lastChecked = TimestampCol(default=None)

    User.sqlmeta.addJoin(MultipleJoin('Patient', joinMethodName='patients'))

    def to_dict(self):
        return {
            'name': '{} {}'.format(self.user.firstName, self.user.lastName),
            'username': self.user.userName,
            'email': self.user.email,
            'ward': self.ward,
            'admitted': self.admission,
            'notes': self.notes,
            'last_checked': self.lastChecked,
            'discharge': self.discharge if self.discharge is not None else "not discharged"
        }

if not Patient.tableExists():
    Patient.createTable()

class Nurse(SQLObject):
    user = ForeignKey('User')
    ward = IntCol()

    User.sqlmeta.addJoin(MultipleJoin('Nurse', joinMethodName='nurses'))

    def to_dict(self):
        return {
            'name': '{} {}'.format(self.user.firstName, self.user.lastName),
            'username': self.user.userName,
            'email': self.user.email,
            'ward': self.ward
        }


if not Nurse.tableExists():
    Nurse.createTable()

# @app.route("/users/add", methods=['POST'])
def add_user(username, first, last, email, passw):
    if ('' or None) in [username, first, last, email, passw]:
        abort(Response("Ensure all fields are filled."))

    if User.select().count() != 0:
        if len(list(User.select(User.q.userName==username))) > 0:
            abort(Response("Username exists"))

    return User(
        userName=username,
        firstName=first,
        lastName=last,
        email=email,
        password=passw
    )

@app.route("/nurse/add/", methods=['POST'])
def add_nurse():
    _userName = request.data.get('userName')
    _firstName = request.data.get('firstName')
    _lastName = request.data.get('lastName')
    _email = request.data.get('email')
    _password = request.data.get('password')

    user = add_user(
        _userName,
        _firstName,
        _lastName,
        _email,
        _password
    )

    Nurse(
        ward=int(request.data.get('ward')),
        user=user
    )

    return "Success"

@app.route("/patient/add/", methods=['POST'])
def add_patient():
    _userName = request.data.get('userName')
    _firstName = request.data.get('firstName')
    _lastName = request.data.get('lastName')
    _email = request.data.get('email')
    _password = request.data.get('password')

    user = add_user(
        _userName,
        _firstName,
        _lastName,
        _email,
        _password
    )

    curr_time = datetime.datetime.now()

    Patient(
        ward=int(request.data.get('ward')),
        admission=curr_time,
        user=user,
        lastChecked=curr_time
    )

    return "Success"

@app.route("/patient/get/", methods=['GET'])
def get_patients():
    _params = request.args

    ward = int(_params['ward'])
    result = list(Patient.select(Patient.q.ward==ward))

    return [x.to_dict() for x in result]

@app.route("/nurse/get/", methods=['GET'])
def get_nurses():
    _params = request.args

    ward = int(_params['ward'])
    result = list(Nurse.select(Nurse.q.ward==ward))

    return [x.to_dict() for x in result]

# @app.route("/patient/update/", methods=['POST'])
# def update_patient():
    