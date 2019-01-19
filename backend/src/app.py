import os
import datetime

from flask import abort, Response, request
from flask_api import FlaskAPI
from sqlobject import *

app = FlaskAPI(__name__)

# Define db location
DB_FILE = os.path.abspath('data.db')
DB_FILE = "sqlite:" + DB_FILE

# connect to sqlite
conn = connectionForURI(DB_FILE)
sqlhub.processConnection = conn

# define Users table
class User(SQLObject):
    userName = StringCol()
    firstName = StringCol()
    lastName = StringCol()
    email = StringCol()
    password = StringCol()

# create Users table if fresh database
if not User.tableExists():
    User.createTable()

# define Patients table
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

# create Patients table if fresh database
if not Patient.tableExists():
    Patient.createTable()

# define Nurse table
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

# create Nurse table if fresh database
if not Nurse.tableExists():
    Nurse.createTable()

# @app.route("/users/add", methods=['POST'])
def add_user(username, first, last, email, passw):
    ''' Helper function to add a user to db when a new nurse or patient is added

    :param username: username for resource access
    :param first: first name of user
    :param last: last name of user
    :param email: email of user
    :param passw: chosen password
    :return: User object created by SQLObject
    '''

    # ensure no fields are missing
    if ('' or None) in [username, first, last, email, passw]:
        abort(Response("Ensure all fields are filled."))

    # Ensure user doesn't exist with same username
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
    '''Flask endpoint for adding nurses

    :return: Success message if successful
    '''
    _userName = request.data.get('userName')
    _firstName = request.data.get('firstName')
    _lastName = request.data.get('lastName')
    _email = request.data.get('email')
    _password = request.data.get('password')

    # create new user object
    user = add_user(
        _userName,
        _firstName,
        _lastName,
        _email,
        _password
    )

    # create nurse object with associated user object
    Nurse(
        ward=int(request.data.get('ward')),
        user=user
    )

    return "Success"

@app.route("/patient/add/", methods=['POST'])
def add_patient():
    '''Flask endpoint to add a patient

    :return: Success message if successful
    '''
    _userName = request.data.get('userName')
    _firstName = request.data.get('firstName')
    _lastName = request.data.get('lastName')
    _email = request.data.get('email')
    _password = request.data.get('password')

    # create new user object
    user = add_user(
        _userName,
        _firstName,
        _lastName,
        _email,
        _password
    )

    curr_time = datetime.datetime.now()

    # create patient object with associated user
    Patient(
        ward=int(request.data.get('ward')),
        admission=curr_time,
        user=user,
        lastChecked=curr_time
    )

    return "Success"

@app.route("/patient/get/", methods=['GET'])
def get_patients():
    '''Flask endpoint to list all patients

    :return: list of patient dictionaries
    '''
    result = list(Patient.select())
    return [x.to_dict() for x in result]

@app.route("/nurse/get/", methods=['GET'])
def get_nurses():
    '''Flask endpoint to list all nurses

    :return: list of nurse dictionaries
    '''
    result = list(Nurse.select())
    return [x.to_dict() for x in result]

@app.route("/patient/update/", methods=['POST'])
def update_patient():
    ''' Update selected patient (selected patient provided through userName in POST

    :return: "Updated" if successful
    '''
    user = request.data.get('userName')

    # get patient that matches provided username
    quer = list(Patient.select(
        AND(User.q.userName==user, Patient.q.userID==User.q.id)
    ))[0]

    # current time
    time = datetime.datetime.now()

    # updated notes
    notes = request.data.get('notes')
    discharge = request.data.get('discharge')

    # update notes if provided
    if notes is not None:
        quer.notes = notes

    # update last checked time
    quer.lastChecked = time

    # if discharge is true, store discharge time
    if bool(discharge) is True:
        quer.discharge = time

    return "Updated"