import React from 'react';
import spinner from './spinner.gif';
import { Alert } from 'reactstrap';

const Spinner = () => (
  <Alert style={{ background: 'white' }}>
    <img
      src={spinner}
      alt='loading'
      style={{ width: '200px', margin: 'auto', display: 'block' }}
    />
  </Alert>
);

export default Spinner;
