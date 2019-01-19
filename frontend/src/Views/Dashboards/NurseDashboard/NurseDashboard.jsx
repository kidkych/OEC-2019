import React, { Component } from 'react';

import GenericDashboard from '../GenericDashboard/GenericDashboard'
import ListOfPatients from './ListOfPatients'
import ListOfNotes from './ListOfNotes'

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
        return (
            <GenericDashboard
                pages={pages}
                onPageChange={this.onPageChange}
                title={this.props.title}>
                {this.state.currentPage === 'page.home' &&
                    "Home page"
                }
                {this.state.currentPage === 'page.tasks' &&
                    "Tasks page"
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