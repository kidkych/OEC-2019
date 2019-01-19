import React, { Component } from 'react';
import { Container, Button, List } from 'semantic-ui-react'
import HumanList from '../../Components/HumanList';
import NoteList from '../../Components/NoteList';

class ListOfNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.notes = [
            {
                id: '001',
                title: "Note 001",
                status: "",
                text: "Patient is reporting increasing migrane",
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
        return (
            <Container className="util-container-addtop">
                <Button onClick={this.props.onBackListener}>Back</Button>
                <NoteList
                    notes={this.state.notes}
                />
            </Container>
        );
    }
}

export default ListOfNotes;
