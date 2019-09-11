import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ListGroupItem
} from 'reactstrap';

const Login = () => (
  <Form className='login-form fade-in'>
    <FormGroup>
      <Label htmlFor='email'>Email</Label>
      <Input type='email' name='' id='login-email' />
      <ListGroupItem className='rounded'>
        Usually, this is the email you used to register.
      </ListGroupItem>
      <Label htmlFor='password'>Password</Label>
      <Input type='password' name='' id='login-password' />
      <Button color='dark' block style={{ marginBottom: '2rem' }}>
        Login
      </Button>
    </FormGroup>
  </Form>
);

export default Login;
