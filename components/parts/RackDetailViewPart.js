import * as React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "../../static/racksdetails.css";
import { Table } from "react-bootstrap";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";
import {
  addToEditRack,
  setBackToDetails,
  deleteHostFromRack,
  setAddedHostToRack,
  addEditHostRack
} from "../../actions/rack";

class RackDetailsViewPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      description: "",
      localization: "",
      size: "",
      hosts: []
    };
  }

  getRack() {
    return {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      localization: this.state.localization,
      size: this.state.size,
      hosts: this.state.hosts
    };
  }

  editRack() {
    var rack = this.getRack();
    this.props.dispatch(addToEditRack(rack));
    this.props.dispatch(setBackToDetails(true));
  }

  editDetailHost(host) {
    this.props.dispatch(addEditHostRack(host));
  }

  deleteHost(host) {
    var rack = this.getRack();
    this.props.dispatch(deleteHostFromRack(rack, host));
  }

  componentDidMount() {
    this.props.dispatch(setBackToDetails(false));
    this.props.dispatch(setAddedHostToRack(false));
    var detailedRack = this.props.detailedRack;
    this.setState({
      id: detailedRack.id,
      name: detailedRack.name,
      description: detailedRack.description,
      localization: detailedRack.localization,
      size: detailedRack.size,
      hosts: detailedRack.hosts
    });
  }

  render() {
    if (this.props.ifEditDetailHost) {
      return <Redirect to="/addhosttorack" />;
    }
    return (
      <div className="RacksDetails">
        <div className="mainText mainTextDetails">{this.state.address}</div>
        <div className="quickActions">
          <Link className="quickActionLink" to="/racks">
            <button className="primaryButton quickActionButton">Powrót</button>
          </Link>
          <Link
            className="quickActionLink"
            to="/editrack"
            onClick={() => this.editRack()}
          >
            <button className="primaryButton quickActionButton">Edytuj</button>
          </Link>
          <Link className="quickActionLink" to="/addhosttorack">
            <button className="primaryButton quickActionButton">
              Dodaj hosta
            </button>
          </Link>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Lokalizacja</th>
              <th>Opis</th>
              <th>Rozmiar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{this.state.name}</th>
              <th>{this.state.localization}</th>
              <th>{this.state.description}</th>
              <th>{this.state.size}</th>
            </tr>
          </tbody>
        </Table>
        <div className="mainText hostsText">Switche w szafie</div>
        <Table striped bordered hover className="hostsTable">
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Pozycja</th>
              <th>Rozmiar</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {this.state.hosts.map((host, index) => {
              return (
                <tr key={index}>
                  <th>{host.name}</th>
                  <th>{host.position}</th>
                  <th>{host.size}</th>
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

const mapStateToProps = ({ rackReducer }) => ({
  detailedRack: rackReducer.detailsRack,
  ifEditDetailHost: rackReducer.ifEditDetailHost
});

export default connect(mapStateToProps)(RackDetailsViewPart);
