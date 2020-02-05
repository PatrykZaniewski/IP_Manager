import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  addHost,
  deleteEditHost,
  editHost,
  setEditHostNull
} from "../../actions/firebase";
import "../../static/hostsAdd.css";

class HostsAddPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: false,
      name: "",
      localization: "",
      description: "",
      id: ""
    };
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { name, description, localization } = this.state;
    if (name === "" || description === "" || localization === "") {
      this.setState({ formError: true });
      return;
    } else {
      this.setState({ formError: false });
    }
    dispatch(
      addHost({
        name: name,
        localization: localization,
        description: description
      })
    );
  };

  handleEdition = () => {
    const { dispatch } = this.props;
    const { name, description, localization, id } = this.state;
    if (name === "" || description === "" || localization === "") {
      this.setState({ formError: true });
      return;
    } else {
      this.setState({ formError: false });
    }
    dispatch(
      editHost({
        name: name,
        localization: localization,
        description: description,
        id: id
      })
    );
  };

  deleteEditHostFun() {
    this.props.dispatch(deleteEditHost());
  }

  changeName(e) {
    this.setState({ formError: false, name: e.target.value });
  }

  changeDesc(e) {
    this.setState({ formError: false, description: e.target.value });
  }

  changeLoc(e) {
    this.setState({ formError: false, localization: e.target.value });
  }

  componentDidMount() {
    var editHost = this.props.editHost;
    var ifElemEdit = this.props.ifElemEdit;
    if (ifElemEdit && editHost !== null) {
      this.setState({
        localization: editHost.localization,
        name: editHost.name,
        description: editHost.description,
        id: editHost.id
      });
      this.props.dispatch(setEditHostNull());
    }
  }

  render() {
    if (this.props.addedHost) {
      return <Redirect to="/hosts" />;
    }
    return (
      <div className="hostsAdd">
        {(this.props.ifElemEdit && (
          <div className="mainText mainTextHostsAdd">Edytuj hosta</div>
        )) || <div className="mainText mainTextHostsAdd">Dodaj hosta</div>}

        <div className="form formHostsAdd">
          <div className="inputDiv inputDivHostsAdd">
            <label className="formLabel formLabelHostsAdd">Nazwa Hosta:</label>
            <input
              className="formInput formInputHostsAdd"
              type="text"
              onChange={e => this.changeName(e)}
              value={this.state.name}
            />
          </div>
          <div className="inputDiv inputDivHostsAdd">
            <label className="formLabel formLabelHostsAdd">Opis:</label>
            <textarea
              className="formInput formInputHostsAdd formInputHostsAddDescription"
              type="text"
              onChange={e => this.changeDesc(e)}
              value={this.state.description}
            />
          </div>
          <div className="inputDiv inputDivHostsAdd">
            <label className="formLabel formLabelHostsAdd">Lokalizacja:</label>
            <input
              className="formInput formInputHostsAdd"
              type="text"
              onChange={e => this.changeLoc(e)}
              value={this.state.localization}
            />
          </div>
          {this.state.formError && (
            <center>
              <p className="errorTextHostsAdd">
                Formularz nie może zawierać pustych miejsc!
              </p>
            </center>
          )}
          <div className="buttonRowHostsAdd">
            <Link
              onClick={() => this.deleteEditHostFun()}
              className="secondaryButtonLinkHostsAdd"
              to="/hosts"
            >
              <button className="secondaryButton secondaryButtonHostsAdd">
                Cofnij
              </button>
            </Link>
            {(this.props.ifElemEdit && (
              <button
                onClick={this.handleEdition}
                className="primaryButton primaryButtonHostsAdd"
              >
                Edytuj
              </button>
            )) || (
              <button
                onClick={this.handleSubmit}
                className="primaryButton primaryButtonHostsAdd"
              >
                Dodaj
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ hostReducer }) => ({
  isAddingHosts: hostReducer.isAddingHosts,
  addingHostFailure: hostReducer.addingHostFailure,
  addedHost: hostReducer.addedHost,
  ifElemEdit: hostReducer.ifEditHost,
  editHost: hostReducer.editHost
});
export default connect(mapStateToProps)(HostsAddPart);
