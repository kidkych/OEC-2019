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
                    title={this.props.title}
                    buttonList={pages} default="page.home"
                    onSwitch={this.props.onPageChange}
                    />
                {this.props.children}
            </div>
        );
    }
}

export default Login;