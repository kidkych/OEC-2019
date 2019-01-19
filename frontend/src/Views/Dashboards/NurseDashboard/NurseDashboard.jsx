import React, {Component} from 'react';

import GenericDashboard from '../GenericDashboard/GenericDashboard'

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
        var pages=[
            {id: 'page.home', name: 'Home'},
            {id: 'page.tasks', name: 'Tasks'},
        ];
        return (
            <GenericDashboard
                onPageChange={this.onPageChange}
                title={this.props.title}>
                {this.state.currentPage === 'page.home' &&
                    "Home page"
                }
                {this.state.currentPage === 'page.tasks' &&
                    "Tasks page"
                }
            </GenericDashboard>
        );
    }
}

export default NurseDashboard;