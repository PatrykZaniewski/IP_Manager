import * as React from "react";
import { Link } from "react-router-dom";
import "../../static/headerMenu.css";
import PersonIcon from "../../icons/PersonIcon";
import LogoutIcon from "../../icons/LogoutIcon";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth";

class HeaderMenu extends React.Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  render() {
    const { isLoggingOut, logoutError } = this.props;

    return (
      <div className="header">
        <div className="left">
          <Link to="/" className="mainText">
            IP Manager
          </Link>
        </div>
        <div className="mainTextHeaderLabel">
          <label className="mainText mainTextHeader">{this.props.tab}</label>
        </div>
        <div className="right">
          <PersonIcon className="icon" />
          <label className="mainText personText">Admin</label>
          <div className="logout" onClick={this.handleLogout}>
            <LogoutIcon className="icon" />
            <label className="mainText logoutText">Wyloguj</label>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}
export default connect(mapStateToProps)(HeaderMenu);
