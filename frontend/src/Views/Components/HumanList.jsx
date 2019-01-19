import React, { Component } from 'react';
import { Container, List, Button, ButtonGroup } from 'semantic-ui-react'

// HumanList renders a list of items which have data and actions associated
// with them. Data will be displayed as labels and actions may be invoked by
// buttons. This component requires a listener for actions.
class HumanList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.items = props.items;
    }
    selectPatient = (id) => {
        this.setState({
            selectedPatient: id,
        });
    }
    render() {
        var items = this.state.items.map((item) => {
            var actionButtons = item.actions.map((action) => {
                return (
                    <Button
                        key={item.id + '.' + action.id}
                        onClick={() => this.props.actionListener(item.id, action.id)}
                    > {action.text}</Button >
                );
            })
            return (
                <List.Item key={item.id}>
                    <List.Icon name={item.icon} size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>{item.title}</List.Header>
                        <List.Description as='a'>{item.status}</List.Description>
                        <ButtonGroup floated='right'>
                            {actionButtons}
                        </ButtonGroup>
                    </List.Content>
                </List.Item>
            );
        })
        return (
            <List divided relaxed>
                {items}
            </List >
        );
    }
}

export default HumanList;

