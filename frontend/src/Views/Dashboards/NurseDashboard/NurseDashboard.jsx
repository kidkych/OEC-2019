import React, { Component } from 'react';

import GenericDashboard from '../GenericDashboard/GenericDashboard'
import ListOfPatients from './ListOfPatients'
import ListOfNotes from './ListOfNotes'
import TaskList from '../../Components/TaskList';
import { Grid, Container, Rail, Segment } from 'semantic-ui-react';

class NurseDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // State variables for page switching
            currentPage: 'page.tasks',
            lastPage: 'page.home',
        }
    }

    // Handler for page switch events recieved from navbar
    onPageChange = (id) => {
        this.state.lastPage = this.state.currentPage;
        this.setState({
            currentPage: id,
        });
    }

    // Handler for action buttons under patient list items
    onPatientAction = (patient, action) => {
        if (action == 'action.view_patient_notes') {
            this.onPageChange('page.notes')
        }
    }

    render() {
        // List of pages for nurse dashboard
        var pages = [
            { id: 'page.home', name: 'Home' },
            { id: 'page.tasks', name: 'Tasks' },
            { id: 'page.patients', name: 'Patient List' },
        ];

        // Hard-coded sample data for tasks
        var sampleDataTasks = [
            {
                id: 't001',
                title: 'Reminder',
                text: 'Some task description',
            },
        ];

        return (
            // Configure the generic dashboard
            <GenericDashboard
                pages={pages}
                onPageChange={this.onPageChange}
                title={this.props.title}>

                {/* Dashboard pages get listed here */}
                {this.state.currentPage === 'page.home' &&
                    <Container>
                        <Grid>
                            {/* Grid row for homescreen widgets */}
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    {/* Urgent notifications row */}
                                    <Grid.Row columns={1}>
                                        <Container className='util-container-addtop'>
                                            <Segment className='util-container-addtop'>
                                                Urgent notifications go here
                                            </Segment>
                                        </Container>
                                    </Grid.Row>
                                    {/* List of patients row */}
                                    <Grid.Row columns={1}>
                                        <Container className='util-container-addtop'>
                                            <Segment className='util-container-addtop'>
                                                <ListOfPatients actionListener={this.onPatientAction} />
                                            </Segment>
                                        </Container>
                                    </Grid.Row>
                                </Grid.Column>

                                {/* Nurse tasks column */}
                                <Grid.Column>
                                    <Container className='util-container-addtop'>
                                        <Segment className='util-container-addtop'>
                                            <TaskList tasks={sampleDataTasks} />
                                        </Segment>
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