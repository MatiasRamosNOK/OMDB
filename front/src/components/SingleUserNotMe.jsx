import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import store from "../redux/store";
import { fetchUserOne } from "../redux/actions/oneUserData";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
class SingleUserNotMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    console.log("Las props son: ", this.props.match);
    store.dispatch(fetchUserOne(this.props.match));
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    {
      console.log(this.state);
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
        <div>
          <Jumbotron style={{ color: "black", width: "70%", margin: "0 auto" }}>
            <h1>Hello, this is the profile of:</h1>
            <h2>{this.state.userOne.userOne.email}</h2>
            <h3>Favourites movies:</h3>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default SingleUserNotMe;
