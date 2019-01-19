import React, { Component } from 'react';
import { Container, List, Button, ButtonGroup } from 'semantic-ui-react'

// HumanList renders a list of items which have data and actions associated
// with them. Data will be displayed as labels and actions may be invoked by
// buttons. This component requires a listener for actions.
class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.tasks = props.tasks;
    }
    render() {
        var tasks = this.state.tasks.map((task) => {
            return (
                <List.Item key={task.id}>
                    <List.Icon name='clock' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>{task.title}</List.Header>
                        <List.Description as='a'>{task.text}</List.Description>
                    </List.Content>
                </List.Item>
            );
        })
        return (
            <List divided relaxed>
                {tasks}
            </List >
        );
    }
}

export default TaskList;
