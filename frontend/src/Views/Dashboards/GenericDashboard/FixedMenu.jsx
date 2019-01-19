import React, {Component} from 'react';
import { Menu, Image, Dropdown, Container} from 'semantic-ui-react'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonList: props.buttonList,
            activeTab: this.props.default,
        };
    }
    onSwitch = (name) => {
        this.setState({
            activeTab: name,
        })
        this.props.onSwitch(name);
    }
    render() {
        var tabItems = this.state.buttonList.map((btn) =>
            <Menu.Item 
                className={
                    "tab" + (btn.id == this.state.activeTab ? " active" : "")
                }
                onClick={(e) => this.onSwitch(btn.id)}
                key={btn.id}
            >{btn.name}</Menu.Item>
        );
        return (
            <div>
                <Menu inverted>
                <Container>
                    <Menu.Item header>
                        {this.props.title}
                    </Menu.Item>

                    {tabItems}

                </Container>
                </Menu>
            </div>
        );
    }
}

export default FixedMenu;