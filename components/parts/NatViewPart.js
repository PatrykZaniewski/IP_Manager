import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Table } from "react-bootstrap";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";
import "../../static/nats.css";
import {
  setNAT,
  falseAddedNAT,
  deleteNAT,
  addToEditNAT
} from "../../actions/nat";

export class NatViewPart extends React.Component {
  falseAddNAT = () => {
    this.props.dispatch(falseAddedNAT());
  };

  editNAT(elem) {
    this.props.dispatch(addToEditNAT(elem));
  }

  deleteNAT(id) {
    this.props.dispatch(deleteNAT(id));
  }

  render() {
    if (this.props.ifEditElemNAT === true) {
      return <Redirect to="/addnat" />;
    }

    return (
      <div className="Nats">
        <div className="mainText mainTextNats">Lista NAT</div>
        <Link to="/addnat" className="linkButton">
          <button
            className="primaryButton primaryButtonNats"
            onClick={this.falseAddNAT}
          >
            Dodaj NAT
          </button>
        </Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nazwa NAT</th>
              <th>Urządzenie</th>
              <th>Podpięta sieć</th>
              <th>Zewnętrzne IP</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {this.props.natList.map((data, index) => {
              return (
                <tr key={index}>
                  <th>{data.name}</th>
                  <th>{data.device}</th>
                  <th>{data.network}</th>
                  <th>{data.outerIP}</th>
                  <th>
                    <span>
                      <button
                        className="transparent"
                        onClick={() => this.editNAT(data)}
                      >
                        <EditIcon className="iconButton" />
                      </button>
                      <button
                        className="transparent"
                        onClick={() => this.deleteNAT(data.id)}
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

const mapStateToProps = ({ natReducer }) => ({
  isAddingNAT: natReducer.isAddingNAT,
  addingNATFailure: natReducer.addingNATFailure,
  addedNAT: natReducer.addedNAT,
  natList: natReducer.nats,
  natNameList: natReducer.natsNames,
  ifEditElemNAT: natReducer.ifEditElemNAT
});

const mapDispatchToProps = dispatch => ({
  setList: () => dispatch(setNAT()),
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NatViewPart);
