import React, { Component } from 'react';

import GenericDashboard from '../GenericDashboard/GenericDashboard'
import ListOfPatients from './ListOfPatients'

class NurseDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'page.home',
        }
    }
    onPageChange = (id) => {
        this.setState({
            currentPage: id,
        });
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
                    <ListOfPatients />
                }
            </GenericDashboard>
        );
    }
}

export default NurseDashboard;