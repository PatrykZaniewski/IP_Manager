import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../../actions/auth";
import "../../static/login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: ""
    };
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { login, password } = this.state;
    dispatch(loginUser(login, password));
  };

  loginChange = e => {
    var login = e.target.value;
    this.setState({ login: login });
  };

  passwordChange = e => {
    var passwd = e.target.value;
    this.setState({ password: passwd });
  };

  render() {
    const { loginError, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="form formLogin">
          <label className="mainText titleLogin">IP Manager</label>
          <div className="inputDiv inputDivLogin">
            <label className="formLabel formLabelLogin">Login:</label>
            <input
              className="formInput formInputLogin"
              type="text"
              onChange={this.loginChange}
            />
          </div>
          <div className="formInputDiv inputDivLogin">
            <label className="formLabel formLabelLogin">Hasło:</label>
            <input
              className="formInput formInputLogin"
              type="password"
              onChange={this.passwordChange}
            />
          </div>

          {loginError && (
            <center>
              <p className="errorTextLogin">Błędny login lub hasło</p>
            </center>
          )}
          <button
            className="primaryButton primaryButtonLogin"
            onClick={this.handleSubmit}
          >
            Zaloguj
          </button>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated
  };
}
export default connect(mapStateToProps)(Login);
