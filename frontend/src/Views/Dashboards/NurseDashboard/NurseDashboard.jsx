import React, { Component } from 'react';

import GenericDashboard from '../GenericDashboard/GenericDashboard'
import ListOfPatients from './ListOfPatients'
import ListOfNotes from './ListOfNotes'
import TaskList from '../../Components/TaskList';
import { Grid, Container } from 'semantic-ui-react';

class NurseDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'page.home',
            lastPage: 'page.patients', // TODO: update this
        }
    }
    onPageChange = (id) => {
        this.setState({
            currentPage: id,
        });
    }
    onPatientAction = (patient, action) => {
        if (action == 'action.view_patient_notes') {
            this.onPageChange('page.notes')
        }
    }
    render() {
        var pages = [
            { id: 'page.home', name: 'Home' },
            { id: 'page.tasks', name: 'Tasks' },
            { id: 'page.patients', name: 'Patient List' },
        ];

        var sampleDataTasks = [
            {
                id: 't001',
                title: 'Reminder',
                text: 'Some task description',
            },
        ];

        return (
            <GenericDashboard
                pages={pages}
                onPageChange={this.onPageChange}
                title={this.props.title}>
                {this.state.currentPage === 'page.home' &&
                    <Container>
                        <Grid>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Grid.Row columns={1}>
                                    </Grid.Row>
                                    <Grid.Row columns={1}>
                                        <ListOfPatients actionListener={this.onPatientAction} />
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column>
                                    <Container className='util-container-addtop'>
                                        <TaskList tasks={sampleDataTasks} />
                                    </Container>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                }
                {this.state.currentPage === 'page.tasks' &&
                    <Container className='util-container-addtop'>
                        <TaskList tasks={sampleDataTasks} />
                    </Container>
                }
                {this.state.currentPage === 'page.patients' &&
                    <ListOfPatients actionListener={this.onPatientAction} />
                }
                {this.state.currentPage === 'page.notes' &&
                    <ListOfNotes onBackListener={() =>
                        this.onPageChange(this.state.lastPage)} />
                }
            </GenericDashboard>
        );
    }
}

export default NurseDashboard;