import React, { Component } from 'react';
import { Container, List } from 'semantic-ui-react'
import HumanList from '../../Components/HumanList';

class ListOfPatients extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.patients = [
            {
                name: "Bob",
                num: "1001",
                status: "some status text",
            },
            {
                name: "Jeremy Bearimy",
                num: "1002",
                status: "some status text",
            },
        ];
    }
    selectPatient = (id) => {
        this.setState({
            selectedPatient: id,
        });
    }
    patientAction = (item, action) => {
        console.log("Performing " + action + " on " + item);
    }
    render() {
        var patients = this.state.patients.map((patient) => {
            return {
                icon: 'heart',
                title: patient.num + " " + patient.name,
                id: patient.num,
                status: patient.status,
                indicators: [],
                actions: [
                    {
                        text: "Need Help",
                        id: "action.need_patient_Help",
                    },
                    {
                        text: "View Notes",
                        id: "action.view_patient_notes",
                    },
                    {
                        text: "Add Note",
                        id: "action.add_patient_note",
                    },
                ]
            }
        });
        return (
            <Container className="util-container-addtop">
                <HumanList
                    items={patients}
                    actionListener={this.patientAction}
                />
            </Container>
        );
    }
}

export default ListOfPatients;
