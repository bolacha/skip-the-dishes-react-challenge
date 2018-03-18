import React, { Component } from 'react';
import { request, plugins } from 'popsicle';

import { Grid, Row, Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button, Alert } from 'react-bootstrap';


export class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email : "",
            password : "",
            alert : ""
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.authenticate = this.authenticate.bind(this);
        // this.userLogged = this.props.route.userLogged.bind(this);
    }

    authenticate() {

        const self = this;


        new Promise((resolve, reject) => {
            request({
                method: 'POST',
                url: 'http://api-vanhack-event-sp.azurewebsites.net//api/v1/Customer/auth',
                query: {
                    email: this.state.email,
                    password: this.state.password
                }
            })
            .then(function (res) {
                console.log(res);
                if(res.status == 400) {
                    const alert = JSON.parse(res.body);
                    reject(alert );
                } else {
                    resolve(res.body);
                }
            });
        }).then((result) => {

            self.props.userLogged(Object.assign(this.state, { token : result}))
            self.props.history.push('/')
        }).catch((err) => {

            console.log(err);
            const new_state = Object.assign(this.state, { alert: err.error });



            this.setState(new_state);
        });
    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    render() {

        const alert = this.state.alert || "";

        return (
            <Grid style={{width: '960px'}}>
                <Row>
                    <Form horizontal>
                        { alert.length > 0 ? (
                            <Alert bsStyle="warning">
                                <strong>{ alert }</strong>
                            </Alert>
                        ) : ""}
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Email
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.handleChangeEmail}/>

                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                        Password
                        </Col>
                        <Col sm={10}>
                        <FormControl type="password" placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChangePassword}/>
                        </Col>
                        </FormGroup>

                        <FormGroup>
                        <Col smOffset={2} sm={10}>
                        <Checkbox>Remember me</Checkbox>
                        </Col>
                        </FormGroup>

                        <FormGroup>
                        <Col smOffset={2} sm={10}>
                        <Button type="button" onClick={this.authenticate}>Sign in</Button>
                        </Col>
                        </FormGroup>
                    </Form>
                </Row>
            </Grid>
        );
    }
}
