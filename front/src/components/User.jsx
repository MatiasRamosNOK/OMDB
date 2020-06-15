import React from "react";

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <a href="/users/login">
          <p>Login</p>
        </a>
        <a href="/users/register">
          <p>Register</p>
        </a>
      </div>
    );
  }
}
export default NavBar;
