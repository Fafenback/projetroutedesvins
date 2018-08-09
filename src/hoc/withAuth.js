import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Connexion from "../components/componentsMain/Connexion";

const withAuth = WrapComponent => {
  class Auth extends Component {

    render() {
      const { loggedUser, user } = this.context;
      return (
        <div>
          {/* {!loggedUser && <Loader/>} afficher un loader */}
          {loggedUser && WrapComponent === Connexion
            ? <Redirect to="/liste" />
            : <WrapComponent {...this.props} user={user} />}
          {loggedUser === null && <Redirect to="/" />}
        </div>
      );
    }
  }
  Auth.contextTypes = {
    loggedUser: PropTypes.object,
    user: PropTypes.object
  };

  return Auth;
};

export default withAuth;
