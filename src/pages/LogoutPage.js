import React, { Component } from 'react';

import { SearchComponent } from '../components/SearchComponent';

import { Grid, Row } from 'react-bootstrap';


export class LogoutPage extends Component {

    constructor(props) {
        super(props);

        localStorage.setItem('token', undefined);

        this.props.history.push('/')
    }
  render() {
    return (
        <Grid style={{width: '960px'}}>
            <Row>
                <SearchComponent/>
            </Row>
      </Grid>
    );
  }
}
