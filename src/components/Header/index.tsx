// src/components/Header/index.js
import * as React from "react";
import "./Header.css";

interface IProps {
  avatar: any,
  name: any
}
class Header extends React.Component<IProps, {}>{
  public render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom sticky-top justify-content-end">
        <div className="navbar-brand">
          <a className="Nav-brand-logo" href="/">
            Instagram
                   </a>
        </div>

        <div className="ml-auto"/>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon" />
        </button>



        <div className="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
        <div className="Polaroid-user-avatar ml-auto">
          <img src={this.props.avatar} />
        </div>
          <ul className="navbar-nav text-right">
            <li className="nav-item active">
              <a className="nav-link text-dark" href="#">{this.props.name}</a>
            </li>
          </ul>
        </div>

      </nav>
    );
  }
}
export default Header;