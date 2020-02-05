import * as React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "../../static/ipnetworksdetails.css";
import { Table } from "react-bootstrap";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";
import {
  addToEditNetwork,
  setBackToDetails,
  deleteHostFromNetwork,
  setAddedHostToNetwork,
  addEditHostNetwork
} from "../../actions/network";

class IPNetworkDetailsViewPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      address: "",
      description: "",
      zone: "",
      vlan: "",
      assign: "",
      dns: "",
      routable: "",
      hosts: []
    };
  }

  getNetwork() {
    return {
      id: this.state.id,
      address: this.state.address,
      description: this.state.description,
      zone: this.state.zone,
      vlan: this.state.vlan,
      assign: this.state.address,
      dns: this.state.dns,
      routable: this.state.routable,
      hosts: this.state.hosts
    };
  }

  editNetwork() {
    var network = this.getNetwork();
    this.props.dispatch(addToEditNetwork(network));
    this.props.dispatch(setBackToDetails(true));
  }

  editDetailHost(host) {
    this.props.dispatch(addEditHostNetwork(host));
  }

  deleteHost(host) {
    var network = this.getNetwork();
    this.props.dispatch(deleteHostFromNetwork(network, host));
  }

  componentDidMount() {
    this.props.dispatch(setBackToDetails(false));
    this.props.dispatch(setAddedHostToNetwork(false));
    var detailedNetwork = this.props.detailedNetwork;
    this.setState({
      id: detailedNetwork.id,
      address: detailedNetwork.address,
      description: detailedNetwork.description,
      zone: detailedNetwork.zone,
      vlan: detailedNetwork.vlan,
      assign: detailedNetwork.assign,
      dns: detailedNetwork.dns,
      routable: detailedNetwork.routable,
      hosts: detailedNetwork.hosts
    });
  }

  render() {
    if (this.props.ifEditDetailHost) {
      return <Redirect to="/addhosttonetwork" />;
    }
    return (
      <div className="IPNetworksDetails">
        <div className="mainText mainTextDetails">{this.state.address}</div>
        <div className="quickActions">
          <Link className="quickActionLink" to="/ipnetworks">
            <button className="primaryButton quickActionButton">Powrót</button>
          </Link>
          <Link
            className="quickActionLink"
            to="/editipnetwork"
            onClick={() => this.editNetwork()}
          >
            <button className="primaryButton quickActionButton">Edytuj</button>
          </Link>
          <Link className="quickActionLink" to="/addhosttonetwork">
            <button className="primaryButton quickActionButton">
              Podłącz hosta
            </button>
          </Link>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Opis</th>
              <th>Vlan</th>
              <th>Przydzielanie</th>
              <th>Strefa</th>
              <th>DNS</th>
              <th>Trasowalny</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{this.state.description}</th>
              <th>{this.state.vlan}</th>
              <th>{this.state.assign}</th>
              <th>{this.state.zone}</th>
              <th>{this.state.dns}</th>
              <th>{this.state.routable}</th>
            </tr>
          </tbody>
        </Table>
        <div className="mainText hostsText">Hosty w sieci</div>
        <Table striped bordered hover className="hostsTable">
          <thead>
            <tr>
              <th>Adres</th>
              <th>Nazwa</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {this.state.hosts.map((host, index) => {
              return (
                <tr key={index}>
                  <th>{host.address}</th>
                  <th>{host.name}</th>
                  <th>
                    <span>
                      <button
                        className="transparent"
                        onClick={() => this.editDetailHost(host)}
                      >
                        <EditIcon className="iconButton" />
                      </button>
                      <button
                        className="transparent"
                        onClick={() => this.deleteHost(host)}
                      >
                        <DeleteIcon className="iconButton" />
                      </button>
                    </span>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = ({ networkReducer }) => ({
  detailedNetwork: networkReducer.detailsNetwork,
  ifEditDetailHost: networkReducer.ifEditDetailHost
});

export default connect(mapStateToProps)(IPNetworkDetailsViewPart);
