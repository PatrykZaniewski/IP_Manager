import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  addNetwork,
  deleteEditNetwork,
  editNetwork,
  setEditNetworkNull
} from "../../actions/network";
import "../../static/ipnetworksAdd.css";
import { editHost } from "../../actions/firebase";

class IPNetworkAddPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: false,
      address: "",
      description: "",
      zone: "prywatna",
      vlan: "brak",
      assign: "statyczne",
      dns: "tak",
      routable: "tak",
      id: "",
      formErrorMes: "",
      hosts: [],
      vlanSelectList: []
    };
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    const {
      address,
      description,
      zone,
      vlan,
      assign,
      dns,
      routable
    } = this.state;
    var ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/([1-3][1-9]|[0-9])/;
    if (
      address === "" ||
      description === "" ||
      zone === "" ||
      vlan === "" ||
      assign === "" ||
      dns === "" ||
      routable === ""
    ) {
      this.setState({
        formError: true,
        formErrorMes: "Formularz nie może zawierać pustych miejsc!"
      });
      return;
    } else if (!ipRegex.test(address)) {
      this.setState({
        formError: true,
        formErrorMes: "Nieprawidłowy adres IP. Oczekiwano formatu 1.1.1.1"
      });
      return;
    } else {
      this.setState({ formError: false });
    }
    dispatch(
      addNetwork({
        address: address,
        description: description,
        zone: zone,
        vlan: vlan,
        assign: assign,
        dns: dns,
        routable: routable
      })
    );
  };

  handleEdition = () => {
    const { dispatch } = this.props;
    const {
      address,
      description,
      zone,
      vlan,
      assign,
      dns,
      routable,
      id
    } = this.state;
    var ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/([1-3][1-9]|[0-9])/;
    if (
      address === "" ||
      description === "" ||
      zone === "" ||
      vlan === "" ||
      assign === "" ||
      dns === "" ||
      routable === ""
    ) {
      this.setState({
        formError: true,
        formErrorMes: "Formularz nie może zawierać pustych miejsc!"
      });
      return;
    } else if (!ipRegex.test(address)) {
      this.setState({
        formError: true,
        formErrorMes: "Nieprawidłowy adres IP. Oczekiwano formatu 1.1.1.1"
      });
      return;
    } else {
      this.setState({ formError: false });
    }
    dispatch(
      editNetwork({
        address: address,
        description: description,
        zone: zone,
        vlan: vlan,
        assign: assign,
        dns: dns,
        routable: routable,
        hosts: this.state.hosts,
        id: id
      })
    );
  };

  deleteEditNetworkFun() {
    this.props.dispatch(deleteEditNetwork());
  }

  changeAddress(e) {
    this.setState({ formError: false, address: e.target.value });
  }

  changeDesc(e) {
    this.setState({ formError: false, description: e.target.value });
  }

  changeZone(e) {
    this.setState({ formError: false, zone: e.target.value });
  }

  changeVlan(e) {
    this.setState({ formError: false, vlan: e.target.value });
  }

  changeAssign(e) {
    this.setState({ formError: false, assign: e.target.value });
  }

  changeDns(e) {
    this.setState({ formError: false, dns: e.target.value });
  }

  changeRoutable(e) {
    this.setState({ formError: false, routable: e.target.value });
  }

  componentDidMount() {
    var vlansSelectList = [{ name: "brak" }];
    this.props.vlanList.forEach(function(vlan) {
      vlansSelectList.push(vlan);
    });
    this.setState({ vlanSelectList: vlansSelectList });
    var editNetwork = this.props.editNetwork;
    var ifElemEdit = this.props.ifElemEditNetwork;
    if (ifElemEdit && editHost !== undefined && editNetwork !== null) {
      this.setState({
        address: editNetwork.address,
        description: editNetwork.description,
        zone: editNetwork.zone,
        vlan: editNetwork.vlan,
        assign: editNetwork.assign,
        dns: editNetwork.dns,
        routable: editNetwork.routable,
        hosts: editNetwork.hosts,
        id: editNetwork.id
      });
      this.props.dispatch(setEditNetworkNull());
    }
  }

  render() {
    if (this.props.addedNetwork) {
      if (this.props.backToDetails) {
        return <Redirect to="/ipnetworksdetails" />;
      }
      return <Redirect to="/ipnetworks" />;
    }
    return (
      <div className="IPNetworksAdd">
        {(this.props.ifElemEditNetwork && (
          <div className="mainText mainTextIPNetworksAdd">Edytuj sieć IP</div>
        )) || (
          <div className="mainText mainTextIPNetworksAdd">Dodaj sieć IP</div>
        )}

        <div className="form formIPNetworksAdd">
          <div className="inputDiv inputDivIPNetworksAdd">
            <label className="formLabel formLabelIPNetworksAdd">
              Adres sieci:
            </label>
            <input
              className="formInput formInputIPNetworksAdd"
              type="text"
              onChange={e => this.changeAddress(e)}
              value={this.state.address}
            />
          </div>
          <div className="inputDiv inputDivIPNetworksAdd">
            <label className="formLabel formLabelIPNetworksAdd">
              Opis sieci:
            </label>
            <textarea
              className="formInput formInputIPNetworksAdd formInputIPNetworksAddDescription"
              type="text"
              onChange={e => this.changeDesc(e)}
              value={this.state.description}
            />
          </div>
          <div className="inputDiv inputDivIPNetworksAdd">
            <label className="formLabel formLabelIPNetworksAdd">Strefa:</label>
            <select
              className="formInput formInputIPNetworksAdd"
              onChange={e => this.changeZone(e)}
              value={this.state.zone}
            >
              <option>prywatna</option>
              <option>DMZ</option>
              <option>publiczna</option>
            </select>
          </div>
          <div className="inputDiv inputDivIPNetworksAdd">
            <label className="formLabel formLabelIPNetworksAdd">VLAN:</label>
            <select
              className="formInput formInputIPNetworksAdd"
              onChange={e => this.changeVlan(e)}
              value={this.state.vlan}
            >
              {this.state.vlanSelectList.map((vlan, index) => {
                return <option key={index}>{vlan.name}</option>;
              })}
            </select>
          </div>
          <div className="inputDiv inputDivIPNetworksAdd">
            <label className="formLabel formLabelIPNetworksAdd">
              Przydzielanie:
            </label>
            <select
              className="formInput formInputIPNetworksAdd"
              onChange={e => this.changeAssign(e)}
              value={this.state.assign}
            >
              <option>statyczne</option>
              <option>DHCP</option>
            </select>
          </div>
          <div className="inputDiv inputDivIPNetworksAdd">
            <label className="formLabel formLabelIPNetworksAdd">
              Serwer DNS:
            </label>
            <select
              className="formInput formInputIPNetworksAdd"
              onChange={e => this.changeDns(e)}
              value={this.state.dns}
            >
              <option>Tak</option>
              <option>Nie</option>
            </select>
          </div>
          <div className="inputDiv inputDivIPNetworksAdd">
            <label className="formLabel formLabelIPNetworksAdd">
              Trasowalny:
            </label>
            <select
              className="formInput formInputIPNetworksAdd"
              onChange={e => this.changeRoutable(e)}
              value={this.state.routable}
            >
              <option>Tak</option>
              <option>Nie</option>
            </select>
          </div>
          {this.state.formError && (
            <center>
              <p className="errorTextIPNetworksAdd">
                {this.state.formErrorMes}
              </p>
            </center>
          )}
          <div className="buttonRowIPNetworksAdd">
            {(this.props.backToDetails && (
              <Link
                onClick={() => this.deleteEditNetworkFun()}
                className="secondaryButtonLinkIPNetworksAdd"
                to="/ipnetworksdetails"
              >
                <button className="secondaryButton secondaryButtonIPNetworksAdd">
                  Cofnij
                </button>
              </Link>
            )) || (
              <Link
                onClick={() => this.deleteEditNetworkFun()}
                className="secondaryButtonLinkIPNetworksAdd"
                to="/ipnetworks"
              >
                <button className="secondaryButton secondaryButtonIPNetworksAdd">
                  Cofnij
                </button>
              </Link>
            )}
            {(this.props.ifElemEditNetwork && (
              <button
                onClick={this.handleEdition}
                className="primaryButton primaryButtonIPNetworksAdd"
              >
                Edytuj
              </button>
            )) || (
              <button
                onClick={this.handleSubmit}
                className="primaryButton primaryButtonIPNetworksAdd"
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

const mapStateToProps = ({ networkReducer, vlanReducer }) => ({
  isAddingNetworks: networkReducer.isAddingNetworks,
  addingNetworkFailure: networkReducer.addingNetworkFailure,
  addedNetwork: networkReducer.addedNetwork,
  ifElemEditNetwork: networkReducer.ifEditElemNetwork,
  editNetwork: networkReducer.editNetwork,
  vlanList: vlanReducer.vlans,
  backToDetails: networkReducer.backToDetails
});
export default connect(mapStateToProps)(IPNetworkAddPart);
