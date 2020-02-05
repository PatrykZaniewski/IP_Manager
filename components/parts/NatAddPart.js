import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  addNAT,
  deleteEditNAT,
  editNAT,
  setEditNATNull
} from "../../actions/nat";
import "../../static/natsAdd.css";

class NatAddPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: false,
      name: "",
      network: "brak",
      device: "brak",
      outerIP: "",
      id: "",
      hostsSelectList: [],
      networkSelectList: []
    };
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { name, network, outerIP, device } = this.state;
    var ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;
    if (name === "" || network === "" || outerIP === "" || device === "") {
      this.setState({
        formError: true,
        formErrorMes: "Formularz nie może zawierać pustych miejsc!"
      });
      return;
    } else if (!ipRegex.test(outerIP)) {
      this.setState({
        formError: true,
        formErrorMes: "Nieprawidłowy adres IP. Oczekiwano formatu 1.1.1.1"
      });
      return;
    } else {
      this.setState({ formError: false });
    }
    dispatch(
      addNAT({
        name: name,
        network: network,
        outerIP: outerIP,
        device: device
      })
    );
  };

  handleEdition = () => {
    const { dispatch } = this.props;
    const { name, network, device, outerIP, id } = this.state;
    var ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;
    if (name === "" || network === "" || outerIP === "" || device === "") {
      this.setState({
        formError: true,
        formErrorMes: "Formularz nie może zawierać pustych miejsc!"
      });
      return;
    } else if (!ipRegex.test(outerIP)) {
      this.setState({
        formError: true,
        formErrorMes: "Nieprawidłowy adres IP. Oczekiwano formatu 1.1.1.1"
      });
      return;
    } else {
      this.setState({ formError: false });
    }
    dispatch(
      editNAT({
        name: name,
        network: network,
        outerIP: outerIP,
        device: device,
        id: id
      })
    );
  };

  deleteEditNATFun() {
    this.props.dispatch(deleteEditNAT());
  }

  changeName(e) {
    this.setState({ formError: false, name: e.target.value });
  }

  changeDevice(e) {
    this.setState({ formError: false, device: e.target.value });
  }

  changeOuterIP(e) {
    this.setState({ formError: false, outerIP: e.target.value });
  }

  changeNetwork(e) {
    this.setState({ formError: false, network: e.target.value });
  }

  componentDidMount() {
    var hostsSelectList = [{ name: "brak" }];
    this.props.hostsList.forEach(function(host) {
      hostsSelectList.push(host);
    });
    this.setState({ hostsSelectList: hostsSelectList });
    var networksSelectList = [{ address: "brak" }];
    this.props.networksList.forEach(function(net) {
      networksSelectList.push(net);
    });
    this.setState({ networkSelectList: networksSelectList });

    var editNAT = this.props.editNAT;
    var ifElemEdit = this.props.ifElemEditNAT;
    if (ifElemEdit && editNAT !== null) {
      this.setState({
        outerIP: editNAT.outerIP,
        name: editNAT.name,
        network: editNAT.network,
        device: editNAT.device,
        id: editNAT.id
      });
      this.props.dispatch(setEditNATNull());
    }
  }

  render() {
    if (this.props.addedNAT) {
      return <Redirect to="/nats" />;
    }
    return (
      <div className="NatsAdd">
        {(this.props.ifElemEditNAT && (
          <div className="mainText mainTextNatsAdd">Edytuj NAT</div>
        )) || <div className="mainText mainTextNatsAdd">Dodaj NAT</div>}

        <div className="form formNatsAdd">
          <div className="inputDiv inputDivNatsAdd">
            <label className="formLabel formLabelNatsAdd">Nazwa NAT:</label>
            <input
              className="formInput formInputNatsAdd"
              type="text"
              onChange={e => this.changeName(e)}
              value={this.state.name}
            />
          </div>
          <div className="inputDiv inputDivNatsAdd">
            <label className="formLabel formLabelNatsAdd">Urządzenie:</label>
            <select
              className="formInput formInputNatsAdd"
              onChange={e => this.changeDevice(e)}
              value={this.state.device}
            >
              {this.state.hostsSelectList.map((host, index) => {
                return <option key={index}>{host.name}</option>;
              })}
            </select>
          </div>
          <div className="inputDiv inputDivNatsAdd">
            <label className="formLabel formLabelNatsAdd">Podpięta sieć:</label>
            <select
              className="formInput formInputNatsAdd"
              onChange={e => this.changeNetwork(e)}
              value={this.state.network}
            >
              {this.state.networkSelectList.map((net, index) => {
                return <option key={index}>{net.address}</option>;
              })}
            </select>
          </div>
          <div className="inputDiv inputDivNatsAdd">
            <label className="formLabel formLabelNatsAdd">Zewnętrzne IP:</label>
            <input
              className="formInput formInputNatsAdd"
              type="text"
              onChange={e => this.changeOuterIP(e)}
              value={this.state.outerIP}
            />
          </div>
          {this.state.formError && (
            <center>
              <p className="errorTextNatsAdd">{this.state.formErrorMes}</p>
            </center>
          )}
          <div className="buttonRowNatsAdd">
            <Link
              onClick={() => this.deleteEditNATFun()}
              className="secondaryButtonLinkNatsAdd"
              to="/nats"
            >
              <button className="secondaryButton secondaryButtonNatsAdd">
                Cofnij
              </button>
            </Link>
            {(this.props.ifElemEditNAT && (
              <button
                onClick={this.handleEdition}
                className="primaryButton primaryButtonNatsAdd"
              >
                Edytuj
              </button>
            )) || (
              <button
                onClick={this.handleSubmit}
                className="primaryButton primaryButtonNatsAdd"
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

const mapStateToProps = ({ natReducer, hostReducer, networkReducer }) => ({
  isAddingNAT: natReducer.isAddingNAT,
  addingNATFailure: natReducer.addingNATFailure,
  addedNAT: natReducer.addedNAT,
  ifElemEditNAT: natReducer.ifEditElemNAT,
  editNAT: natReducer.editNAT,
  hostsList: hostReducer.hosts,
  networksList: networkReducer.networks
});
export default connect(mapStateToProps)(NatAddPart);
