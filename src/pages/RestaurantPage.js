import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';

import { Grid, Row, Col, Panel } from 'react-bootstrap';

export class RestaurantPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cousineId: qs.parse(this.props.location.search).cousineId,
            stores : []
        }
    }

    componentWillMount() {

        fetch('http://api-vanhack-event-sp.azurewebsites.net//api/v1/Cousine/'+this.state.cousineId+'/stores')
        .then(response => {
          if (response.status === 200) {
            // Only bother with this XHR response
            // if this query term matches what we're waiting for.

            response.json()
            .then(results => {

                const _state = Object.assign(this.state, {stores : results});
                this.setState(_state);
            })

          }
        });
    }

    renderRestaurants() {

        if(this.state.stores.length > 0) {
            return this.state.stores.map((s) => {
                return (
                    <Col key={s.id} md={3}>
                        <a href={`/food?storeId=${s.id}`} style={{'textDecoration': 'none'}}>
                            <Panel>
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3">{s.name}</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>{s.address}</Panel.Body>
                            </Panel>
                        </a>
                    </Col>
                );
            });
        };
    }

    render() {

        const _stores = this.state.stores || [];

        return (
            <Grid>
                <Row>
                    { _stores.length ? (this.renderRestaurants()) : (<h2> Some other return </h2>)}
                </Row>
            </Grid>
        );
  }
}

RestaurantPage.propTypes = {
    cousineId: PropTypes.number
}
