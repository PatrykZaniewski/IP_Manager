import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Table } from "react-bootstrap";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";
import "../../static/ipnetworks.css";
import {
  setNetwork,
  falseAddedNetwork,
  deleteNetwork,
  addToEditNetwork,
  addDetailsNetwork
} from "../../actions/network";

export class IPNetworkViewPart extends React.Component {
  falseAddNetwork = () => {
    this.props.dispatch(falseAddedNetwork());
  };

  editNetwork(elem) {
    this.props.dispatch(addToEditNetwork(elem));
  }

  deleteNetwork(id) {
    this.props.dispatch(deleteNetwork(id));
  }

  addDetailsNetwork(data) {
    this.props.dispatch(addDetailsNetwork(data));
  }

  render() {
    if (this.props.ifEditNetwork === true) {
      return <Redirect to="/editipnetwork" />;
    }

    return (
      <div className="IPNetworks">
        <div className="mainText mainTextIPNetworks">Lista sieci</div>
        <Link to="/addipnetwork" className="linkButton">
          <button
            className="primaryButton primaryButtonIPNetworks"
            onClick={this.falseAddNetwork}
          >
            Dodaj sieć
          </button>
        </Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sieć</th>
              <th>Opis</th>
              <th>Vlan</th>
              <th>Przydzielanie</th>
              <th>Strefa</th>
              <th>DNS</th>
              <th>Trasowalny</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {this.props.networkList.map((data, index) => {
              return (
                <tr key={index}>
                  <th>
                    <Link className="tabelem"
                      to="/ipnetworksdetails"
                      onClick={() => this.addDetailsNetwork(data)}
                    >
                      {data.address}
                    </Link>
                  </th>
                  <th>{data.description}</th>
                  <th>{data.vlan}</th>
                  <th>{data.assign}</th>
                  <th>{data.zone}</th>
                  <th>{data.dns}</th>
                  <th>{data.routable}</th>
                  <th>
                    <span>
                      <button
                        className="transparent"
                        onClick={() => this.editNetwork(data)}
                      >
                        <EditIcon className="iconButton" />
                      </button>
                      <button
                        className="transparent"
                        onClick={() => this.deleteNetwork(data.id)}
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
  isAddingNetworks: networkReducer.isAddingNetwork,
  addingNetworkFailure: networkReducer.addingNetworkFailure,
  addedNetwork: networkReducer.addedNetwork,
  networkList: networkReducer.networks,
  networkNameList: networkReducer.networkName,
  ifEditNetwork: networkReducer.ifEditElemNetwork
});

export default connect(mapStateToProps)(IPNetworkViewPart);
