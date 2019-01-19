import React, {Component} from 'react';
import FixedMenu from './FixedMenu'

class Login extends Component {
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
            <div>
                <FixedMenu
                    buttonList={pages} default="page.home"
                    onSwitch={this.onPageChange}
                    />
                <p>Haiyo</p>
                {this.state.currentPage === 'page.home' &&
                    "Home page"
                }
                {this.state.currentPage === 'page.tasks' &&
                    "Tasks page"
                }
            </div>
        );
    }
}

export default Login;