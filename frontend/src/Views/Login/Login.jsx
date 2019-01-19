import React, {Component} from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import './Login.css'
import { API } from '../../constants'
import sha1 from 'sha1'
class Login extends Component {

    constructor() {
        super()
        this.state = {
            uid: '',
            password: ''
        } 
    }

    changeUID(event) {
        this.setState({uid: event.target.value});
    }

    changePassword(event) {
        this.setState({password: sha1(event.target.value)});
    }

    handleLoginSubmit(event) {
        event.preventDefault();
        fetch("/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({uid: this.state.uid, password: this.state.password})
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(`Error! ${err}`))
    }

    render() {
        return (
        <div className='login-form'>
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                <Image src='/logo.png' /> Please enter your ID and password
                </Header>
                <Form size='large' onSubmit={this.handleLoginSubmit.bind(this)}>
                <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='ID Number' onChange={this.changeUID.bind(this)}/>
                    <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    onChange={this.changePassword.bind(this)}
                    />
                    <Button color='teal' fluid size='large'>
                    Login
                    </Button>
                </Segment>
                </Form>
                <Message>
                Don't remember your ID or password? <br/>
                Contact the staff for help.
                </Message>
            </Grid.Column>
            </Grid>
        </div>
        );
    }
}
export default Login;