// src/components/Header/index.js
import * as React from "react";
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import LoginHOC from 'react-facebook-login-hoc';

const configureLoginProps = {
  scope: 'public_profile',
  xfbml: false,
  cookie: false,
  version: 2.6,
  language: 'en_US',
  appId: '820688131602902'
}

interface IProps {
  avatar: any,
  name: any,
  fb: any
}
class Header extends React.Component<IProps, {}>{
  public render() {
    let profileContent;

    if (this.props.avatar != null && this.props.name != null) {
      profileContent = (
        <div className="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
          <div className="Polaroid-user-avatar ml-auto">
            <img src={this.props.avatar} />
          </div>
          <ul className="navbar-nav text-right">
            <li className="nav-item active">
              <div className="dropdown">
                <a className="btn dropdown-toggle nav-link text-dark" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">{this.props.name}</a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                  <NavLink to="/profile" className="dropdown-item"><FontAwesomeIcon icon={faUserCircle} /> Profile</NavLink>
                  <NavLink onClick={this.props.fb.logout} to="/login" className="dropdown-item"><FontAwesomeIcon icon={faSignOutAlt} /> Logout</NavLink>
                </div>
              </div>

            </li>
          </ul>
        </div>
      )
    } 

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom sticky-top justify-content-end">
        <div className="navbar-brand">
        <NavLink to="/" className="Nav-brand-logo">Instagram</NavLink>
        </div>

        <div className="ml-auto" />

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon" />
        </button>

        {profileContent}
        <div className="pb-3" />
      </nav>
    );
  }
}
export default LoginHOC(configureLoginProps)(Header);