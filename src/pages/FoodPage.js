import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';

import { Grid, Row, Col, Panel, Badge } from 'react-bootstrap';

export class FoodPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            storeId: qs.parse(this.props.location.search).storeId,
            foods : []
        }
    }

    componentWillMount() {

        fetch('http://api-vanhack-event-sp.azurewebsites.net//api/v1/Store/'+this.state.storeId+'/products')
        .then(response => {
          if (response.status === 200) {

            response.json()
                .then(results => {

                    const _state = Object.assign(this.state, {foods : results});
                    this.setState(_state);
                })
          }
        });
    }

    renderFoods() {

        if(this.state.foods.length > 0) {

            return this.state.foods.map((s) => {
                return (
                    <Col key={s.id} md={3}>
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">{s.name} <Badge>US${s.price}</Badge> </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <p>
                                {s.description}
                                </p>
                            </Panel.Body>
                            <Panel.Footer style={{ color: '#fff', backgroundColor: '#337ab7', borderColor: '#2e6da4', cursor: 'pointer'}} bsStyle="primary">Add to my Order</Panel.Footer>

                        </Panel>
                    </Col>
                );
            });
        };
    }

  render() {

      const _foods = this.state.foods || [];

      console.log(_foods);
    return (
        <div className="App">
            <Grid>
                <Row>
                    { _foods.length ? (this.renderFoods()) : (<h2> Some other return </h2>)}
                </Row>
            </Grid>
        </div>
    );
  }
}

FoodPage.propTypes = {
    cousineId: PropTypes.number
}
