import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  addVLAN,
  deleteEditVLAN,
  editVLAN,
  setEditVLANNull
} from "../../actions/vlan";
import "../../static/vlansAdd.css";

class VlansAddPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: false,
      name: "",
      network: "brak",
      description: "",
      id: "",
      networkSelectList: []
    };
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { name, description, network } = this.state;
    if (name === "" || description === "" || network === "") {
      this.setState({ formError: true });
      return;
    } else {
      this.setState({ formError: false });
    }
    dispatch(
      addVLAN({
        name: name,
        network: network,
        description: description
      })
    );
  };

  handleEdition = () => {
    const { dispatch } = this.props;
    const { name, description, network, id } = this.state;
    if (name === "" || description === "" || network === "") {
      this.setState({ formError: true });
      return;
    } else {
      this.setState({ formError: false });
    }
    dispatch(
      editVLAN({
        name: name,
        network: network,
        description: description,
        id: id
      })
    );
  };

  deleteEditVLANFun() {
    this.props.dispatch(deleteEditVLAN());
  }

  changeName(e) {
    this.setState({ formError: false, name: e.target.value });
  }

  changeDesc(e) {
    this.setState({ formError: false, description: e.target.value });
  }

  changeNetwork(e) {
    this.setState({ formError: false, network: e.target.value });
  }

  componentDidMount() {
    var networksSelectList = [{ address: "brak" }];
    this.props.networksList.forEach(function(net) {
      networksSelectList.push(net);
    });
    this.setState({ networkSelectList: networksSelectList });

    var editVLAN = this.props.editVLAN;
    var ifElemEdit = this.props.ifElemEditVLAN;
    if (ifElemEdit && editVLAN !== null) {
      this.setState({
        description: editVLAN.description,
        name: editVLAN.name,
        network: editVLAN.network,
        id: editVLAN.id
      });
      this.props.dispatch(setEditVLANNull());
    }
  }

  render() {
    if (this.props.addedVLAN) {
      return <Redirect to="/vlans" />;
    }
    return (
      <div className="VlansAdd">
        {(this.props.ifElemEditVLAN && (
          <div className="mainText mainTextVlansAdd">Edytuj VLAN</div>
        )) || <div className="mainText mainTextVlansAdd">Dodaj VLAN</div>}

        <div className="form formVlansAdd">
          <div className="inputDiv inputDivVlansAdd">
            <label className="formLabel formLabelVlansAdd">Nazwa VLAN:</label>
            <input
              className="formInput formInputVlansAdd"
              type="text"
              onChange={e => this.changeName(e)}
              value={this.state.name}
            />
          </div>
          <div className="inputDiv inputDivVlansAdd">
            <label className="formLabel formLabelVlansAdd">Opis:</label>
            <textarea
              className="formInput formInputVlansAdd formInputVlansAddDescription"
              type="text"
              onChange={e => this.changeDesc(e)}
              value={this.state.description}
            />
          </div>
          <div className="inputDiv inputDivVlansAdd">
            <label className="formLabel formLabelVlansAdd">
              Podpięta sieć:
            </label>
            <select
              className="formInput formInputVlansAdd"
              onChange={e => this.changeNetwork(e)}
              value={this.state.network}
            >
              {this.state.networkSelectList.map((net, index) => {
                return <option key={index}>{net.address}</option>;
              })}
            </select>
          </div>
          {this.state.formError && (
            <center>
              <p className="errorTextVlansAdd">
                Formularz nie może zawierać pustych miejsc!
              </p>
            </center>
          )}
          <div className="buttonRowVlansAdd">
            <Link
              onClick={() => this.deleteEditVLANFun()}
              className="secondaryButtonLinkVlansAdd"
              to="/vlans"
            >
              <button className="secondaryButton secondaryButtonVlansAdd">
                Cofnij
              </button>
            </Link>
            {(this.props.ifElemEditVLAN && (
              <button
                onClick={this.handleEdition}
                className="primaryButton primaryButtonVlansAdd"
              >
                Edytuj
              </button>
            )) || (
              <button
                onClick={this.handleSubmit}
                className="primaryButton primaryButtonVlansAdd"
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

const mapStateToProps = ({ vlanReducer, networkReducer }) => ({
  isAddingVLAN: vlanReducer.isAddingVLAN,
  addingVLANFailure: vlanReducer.addingVLANFailure,
  addedVLAN: vlanReducer.addedVLAN,
  ifElemEditVLAN: vlanReducer.ifEditElemVLAN,
  editVLAN: vlanReducer.editVLAN,
  networksList: networkReducer.networks
});
export default connect(mapStateToProps)(VlansAddPart);
