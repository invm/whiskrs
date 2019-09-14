import React, { Component } from 'react';
import { Input } from 'reactstrap';

export default class Search extends Component {
  state = {};

  render() {
    return (
      <Input
        placeholder='Search for posts'
        className='my-3'
        style={searchStyle}
      />
    );
  }
}

const searchStyle = {};
