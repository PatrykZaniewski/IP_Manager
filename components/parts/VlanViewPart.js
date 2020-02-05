import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Table } from "react-bootstrap";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";
import "../../static/vlans.css";
import {
  setVLAN,
  falseAddedVLAN,
  deleteVLAN,
  addToEditVLAN
} from "../../actions/vlan";

export class VlanViewPart extends React.Component {
  falseAddVLAN = () => {
    this.props.dispatch(falseAddedVLAN());
  };

  editVLAN(elem) {
    this.props.dispatch(addToEditVLAN(elem));
  }

  deleteVLAN(id) {
    this.props.dispatch(deleteVLAN(id));
  }

  render() {
    if (this.props.ifEditElemVLAN === true) {
      return <Redirect to="/addvlan" />;
    }

    return (
      <div className="Vlans">
        <div className="mainText mainTextVlans">Lista VLAN</div>
        <Link to="/addvlan" className="linkButton">
          <button
            className="primaryButton primaryButtonVlans"
            onClick={this.falseAddVLAN}
          >
            Dodaj VLAN
          </button>
        </Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nazwa VLAN</th>
              <th>Podpięta sieć</th>
              <th>Opis</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {this.props.vlans.map((data, index) => {
              return (
                <tr key={index}>
                  <th>{data.name}</th>
                  <th>{data.network}</th>
                  <th>{data.description}</th>
                  <th>
                    <span>
                      <button
                        className="transparent"
                        onClick={() => this.editVLAN(data)}
                      >
                        <EditIcon className="iconButton" />
                      </button>
                      <button
                        className="transparent"
                        onClick={() => this.deleteVLAN(data.id)}
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

const mapStateToProps = ({ vlanReducer }) => ({
  isAddingVLAN: vlanReducer.isAddingVLAN,
  addingVLANFailure: vlanReducer.addingVLANFailure,
  addedVLAN: vlanReducer.addedVLAN,
  vlans: vlanReducer.vlans,
  vlansNames: vlanReducer.vlansNames,
  ifEditElemVLAN: vlanReducer.ifEditElemVLAN
});

const mapDispatchToProps = dispatch => ({
  setList: () => dispatch(setVLAN()),
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VlanViewPart);
