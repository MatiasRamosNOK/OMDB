import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Redirect } from "react-router";
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false,
    };

    this.submitInfo = this.submitInfo.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }
  submitInfo(e) {
    e.preventDefault();
    console.log(e);
    axios.post("/users/register", this.state).then((resp) => {
      if (resp.request.status == 200) {
        this.setState({ redirect: true });
      }
    });
  }

  changeEmail(e) {
    console.log(e.target.value);
    this.setState({ email: e.target.value });
  }

  changePassword(e) {
    console.log(e.target.value);
    this.setState({ password: e.target.value });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/users/login" />;
    }
    return (
      <div className="inputData">
        <Form onSubmit={this.submitInfo}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              onChange={this.changeEmail}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.changePassword}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign up
          </Button>
        </Form>
      </div>
    );
  }
}

export default Register;
