import React, { Component } from 'react';

import { SearchComponent } from '../components/SearchComponent';

import { Navbar, Nav, Grid, Row } from 'react-bootstrap';


export class HomePage extends Component {
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
