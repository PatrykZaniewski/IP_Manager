import * as React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "../../static/hostAddToNetwork.css";
import {
  deleteEditHostNetwork,
  addHostToNetwork,
  editHostInNetwork
} from "../../actions/network";

class HostAddToNetworkPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      address: "",
      oldAddress: "",
      index: -1,
      host: { name: "", id: "" },
      hostsSelectList: []
    };
  }

  deleteEditHostNetworkFun() {
    this.props.dispatch(deleteEditHostNetwork());
  }

  changeHost(e) {
    var hostID = e.target.value;
    if (hostID === "") {
      this.setState({
        id: "",
        name: ""
      });
      return;
    }
    var host = this.props.hosts.find(x => x.id === hostID);
    this.setState({
      id: host.id,
      name: host.name
    });
  }

  changeAddress(e) {
    this.setState({ address: e.target.value });
  }

  handleEdition = () => {
    if (!this.validateForm()) {
      return;
    }
    var host = {
      id: this.state.id,
      name: this.state.name,
      address: this.state.address
    };
    this.props.dispatch(
      editHostInNetwork(this.props.detailNetwork, host, this.state.oldAddress)
    );
    this.props.dispatch(deleteEditHostNetwork());
  };

  handleSubmit = () => {
    if (!this.validateForm()) {
      return;
    }
    var host = {
      id: this.state.id,
      name: this.state.name,
      address: this.state.address
    };
    this.props.dispatch(addHostToNetwork(this.props.detailNetwork, host));
  };

  validateForm() {
    var { name, address } = this.state;
    var ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;
    if (name === "" || address === "") {
      this.setState({
        formError: true,
        formErrorMes: "Formularz nie może zawierać pustych miejsc!"
      });
      return false;
    } else if (!ipRegex.test(address)) {
      this.setState({
        formError: true,
        formErrorMes: "Nieprawidłowy adres IP. Oczekiwano formatu 1.1.1.1"
      });
      return false;
    } else {
      var component = this;
      var hostsInNetwork = this.props.detailNetwork.hosts;
      for (var i = 0; i < hostsInNetwork.length; i++) {
        if (hostsInNetwork[i].address === component.state.address) {
          if (i !== component.state.index) {
            component.setState({
              formError: true,
              formErrorMes: "Zajęty adres IP"
            });
            return false;
          }
        }
      }
      return true;
    }
  }

  componentDidMount() {
    var hostSelectList = [{ id: "", name: "" }];
    this.props.hosts.forEach(function(host) {
      hostSelectList.push(host);
    });
    this.setState({
      hostsSelectList: hostSelectList
    });
    var ifEdit = this.props.ifEditDetailHost;
    if (ifEdit) {
      var { detailHost } = this.props;
      var index = this.props.detailNetwork.hosts.findIndex(
        x => x.address === detailHost.address
      );
      this.setState({
        id: detailHost.id,
        name: detailHost.name,
        address: detailHost.address,
        oldAddress: detailHost.address,
        index: index
      });
    }
  }

  render() {
    if (this.props.hostAdded) {
      return <Redirect to="/ipnetworksdetails" />;
    }
    return (
      <div className="hostNetwork">
        {(this.props.ifEditDetailHost && (
          <div className="mainText mainTextHostNetwork">Edytuj hosta</div>
        )) || <div className="mainText mainTextHostNetwork">Podłącz hosta</div>}
        <div className="form formHostNetworkAdd">
          <div className="inputDiv inputDivHostsAdd">
            <label className="formLabel formLabelHostsAdd">Nazwa Hosta:</label>
            <select
              className="formInput formInputHostsAdd"
              type="text"
              onChange={e => this.changeHost(e)}
              value={this.state.id}
            >
              {this.state.hostsSelectList.map((host, index) => {
                return (
                  <option key={index} value={host.id}>
                    {host.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="inputDiv inputDivHostsAdd">
            <label className="formLabel formLabelHostsAdd">Adres IP:</label>
            <input
              className="formInput formInputHostsAdd"
              type="text"
              onChange={e => this.changeAddress(e)}
              value={this.state.address}
            />
          </div>
          {this.state.formError && (
            <center>
              <p className="errorTextHostsAdd">{this.state.formErrorMes}</p>
            </center>
          )}
          <div className="buttonRowHostsAdd">
            <Link
              onClick={() => this.deleteEditHostNetworkFun()}
              className="secondaryButtonLinkHostsAdd"
              to="/ipnetworksdetails"
            >
              <button className="secondaryButton secondaryButtonHostsAdd">
                Cofnij
              </button>
            </Link>
            {(this.props.ifEditDetailHost && (
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

const mapStateToProps = ({ networkReducer, hostReducer }) => ({
  ifEditDetailHost: networkReducer.ifEditDetailHost,
  detailHost: networkReducer.detailHost,
  detailNetwork: networkReducer.detailsNetwork,
  hosts: hostReducer.hosts,
  hostAdded: networkReducer.hostAddedToNetwork
});

export default connect(mapStateToProps)(HostAddToNetworkPart);
