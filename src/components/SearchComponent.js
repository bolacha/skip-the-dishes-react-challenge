import React, { Component} from 'react';
import { debounce } from 'throttle-debounce';
import { FormGroup, FormControl, ListGroup , ListGroupItem, Jumbotron } from 'react-bootstrap';

export class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { q: "" };
    this.autocompleteSearchDebounced = debounce(500, this.autocompleteSearch);
  }

  changeQuery = event => {
    this.setState({ q: event.target.value }, () => {
      this.autocompleteSearchDebounced(this.state.q);
    });
  };

  makeAutocompleteLookup = q => {
    // Store the latest input here scoped in the App instance.
    this.waitingFor = q;
    fetch('http://api-vanhack-event-sp.azurewebsites.net//api/v1/Cousine/search/' + q)
    .then(response => {
      if (response.status === 200) {
        // Only bother with this XHR response
        // if this query term matches what we're waiting for.
        if (q === this.waitingFor) {
          response.json()
          .then(results => {
              this.setState({_searches: results});
          })
        }
      }
    })
  }

  autocompleteSearch = q => {
    this.makeAutocompleteLookup(q);
  };

  _fetch = q => {
    const _searches = this.state._searches || [];
    _searches.push(q);
    this.setState({ _searches });
  };

  render() {
    const _searches = this.state._searches || [];
    return (
      <Jumbotron>
        <h2>What kinda of food you are looking today ?</h2>
        <FormGroup bsSize="large">
            <FormControl value={this.state.q} onChange={this.changeQuery} type="text" placeholder="Large text" />
        </FormGroup>
        {_searches.length ? (
            <ListGroup>
                {_searches.map((s, i) => {
                  return <ListGroupItem key={s.id} href={`/restaurant?cousineId=${s.id}`}>{s.name}</ListGroupItem>;
                })}
            </ListGroup>
        ) : (
            <h2>Nothing found!</h2>
        )}
      </Jumbotron>
    );
  }
}
