import React from "react";
import store from "../redux/store";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ListGroup from "react-bootstrap/ListGroup";
import { fetchUsers } from "../redux/actions/users";
const array = [1, 2, 3];

class AllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    store.dispatch(fetchUsers(this.state.user.user.id));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    {
      console.log("El estado es:", this.state);
    }
    return (
      <div>
        <div>
          <Navbar>
            <Link className="nav-item nav-link active" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>

            <Link
              className="nav-item nav-link"
              to={`/user/${this.state.user.user.id}`}
            >
              My profile
            </Link>

            <Link className="nav-item nav-link" to={`/user/lookUsers`}>
              Look for friends!
            </Link>

            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text style={{ color: "white" }}>
                Signed in as:
                <p style={{ color: "white" }}>{this.state.user.user.email}</p>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        </div>

        <ListGroup>
          {this.state.users.users.length > 0 ? (
            <div>
              {this.state.users.users.map((user) => {
                return (
                  <ListGroup.Item>
                    <Link to={`/users/${user.id}`}>
                      <p style={{ color: "black" }}>{user.email}</p>
                    </Link>
                  </ListGroup.Item>
                );
              })}
            </div>
          ) : null}
        </ListGroup>
      </div>
    );
  }
}

export default AllUsers;
