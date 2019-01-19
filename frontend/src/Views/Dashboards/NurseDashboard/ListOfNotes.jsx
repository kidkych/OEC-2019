import React, { Component } from 'react';
import { Container, Button, List } from 'semantic-ui-react'
import HumanList from '../../Components/HumanList';
import NoteList from '../../Components/NoteList';

// ListOfNotes renders a simple list of text items
class ListOfNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        // Hard-coded default data
        this.state.notes = [
            {
                id: '001',
                title: "Note 001",
                status: "",
                text: "Patient is reporting increasing migrane",
            },
        ];
    }
    render() {

        // Render the list of notes
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
