import React, { Component } from 'react';
import { Container, List, Button, ButtonGroup } from 'semantic-ui-react'

// HumanList renders a list of items which have data and actions associated
// with them. Data will be displayed as labels and actions may be invoked by
// buttons. This component requires a listener for actions.
class NoteList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.notes = props.notes;
    }
    render() {
        // Render each note
        var notes = this.state.notes.map((note) => {
            return (
                <List.Item key={note.id}>
                    <List.Icon name='paper plane' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>{note.title}</List.Header>
                        <List.Description as='a'>{note.status}</List.Description>
                        {note.text}
                    </List.Content>
                </List.Item>
            );
        })

        // Render final list of notes
        return (
            <List divided relaxed>
                {notes}
            </List >
        );
    }
}

export default NoteList;
