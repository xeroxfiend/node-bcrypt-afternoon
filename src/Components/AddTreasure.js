import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

export default class AddTreasure extends Component {
  constructor() {
    super();
    this.state = {
      treasureUrl: '',
    };
  }

  handleInput(e) {
    this.setState({ treasureUrl: e.target.value });
  }

  addTreasure() {
    axios.post('/api/treasure/user', {
      treasureUrl: this.state.treasureUrl
    }).then(res => {
      this.props.addMyTreasure(res.data)
      this.setState({treasureUrl: ''})
    }).catch(err => Swal.fire(err.response.request.response))
  }

  render() {
    return (
      <div className="addTreasure">
        <input
          type="text"
          placeholder="Add image URL"
          onChange={e => this.handleInput(e)}
          value={this.state.treasureUrl}
        />
        <button onClick={() => this.addTreasure()}>Add</button>
      </div>
    );
  }
}
