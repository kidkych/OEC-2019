import React, { Component } from 'react';
import { Container, List } from 'semantic-ui-react'

class ListOfPatients extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.patients = [
            {
                name: "Bob",
                num: "123456",
                status: "some status text",
            },
            {
                name: "Jeremy Bearimy",
                num: "123456",
                status: "some status text",
            },
        ];
    }
    selectPatient = (id) => {
        this.setState({
            selectedPatient: id,
        });
    }
    render() {
        var patients = this.state.patients.map((patient) =>
            <List.Item>
                <List.Icon name='heart' size='large' verticalAlign='middle' />
                <List.Content>
                    <List.Header as='a'>{patient.num} - {patient.name}</List.Header>
                    <List.Description as='a'>{patient.status}</List.Description>
                </List.Content>
            </List.Item>
        )
        return (
            <Container className="util-container-addtop">
                <List divided relaxed>
                    {patients}
                </List>
            </Container>
        );
    }
}

export default ListOfPatients;
