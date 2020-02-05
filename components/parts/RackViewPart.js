import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Table } from "react-bootstrap";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";
import "../../static/racks.css";
import {
  setRack,
  falseAddedRack,
  deleteRack,
  addToEditRack,
  addDetailsRack
} from "../../actions/rack";

export class RackViewPart extends React.Component {
  falseAddRack = () => {
    this.props.dispatch(falseAddedRack());
  };

  editRack(elem) {
    this.props.dispatch(addToEditRack(elem));
  }

  deleteRack(id) {
    this.props.dispatch(deleteRack(id));
  }

  addDetailsRack(data) {
    this.props.dispatch(addDetailsRack(data));
  }

  render() {
    if (this.props.ifEditRack === true) {
      return <Redirect to="/editrack" />;
    }

    return (
      <div className="Racks">
        <div className="mainText mainTextRacks">Lista szaf</div>
        <Link to="/addrack" className="linkButton">
          <button
            className="primaryButton primaryButtonRacks"
            onClick={this.falseAddRack}
          >
            Dodaj szafę
          </button>
        </Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Lokalizacja</th>
              <th>Opis</th>
              <th>Rozmiar</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {this.props.rackList.map((data, index) => {
              return (
                <tr key={index}>
                  <th>
                    <Link
                      className="tabelem"
                      to="/racksdetails"
                      onClick={() => this.addDetailsRack(data)}
                    >
                      {data.name}
                    </Link>
                  </th>
                  <th>{data.localization}</th>
                  <th>{data.description}</th>
                  <th>{data.size}</th>
                  <th>
                    <span>
                      <button
                        className="transparent"
                        onClick={() => this.editRack(data)}
                      >
                        <EditIcon className="iconButton" />
                      </button>
                      <button
                        className="transparent"
                        onClick={() => this.deleteRack(data.id)}
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
  isAddingRacks: rackReducer.isAddingRack,
  addingRackFailure: rackReducer.addingRackFailure,
  addedRack: rackReducer.addedRack,
  rackList: rackReducer.racks,
  rackNameList: rackReducer.rackName,
  ifEditRack: rackReducer.ifEditElemRack
});

export default connect(mapStateToProps)(RackViewPart);
