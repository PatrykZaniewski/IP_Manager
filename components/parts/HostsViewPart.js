import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Table } from "react-bootstrap";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";
import "../../static/hosts.css";
import { falseAddedHost, deleteHost, addToEdit } from "../../actions/firebase";

export class HostsViewPart extends React.Component {
  falseAddHost = () => {
    this.props.dispatch(falseAddedHost());
  };

  editHost(elem) {
    this.props.dispatch(addToEdit(elem));
  }

  deleteHost(id) {
    this.props.dispatch(deleteHost(id));
  }

  render() {
    if (this.props.ifEditHost === true) {
      return <Redirect to="/addhost" />;
    }

    return (
      <div className="hosts">
        <div className="mainText mainTextHosts">Lista hostów</div>
        <Link to="/addhost" className="linkButton">
          <button
            className="primaryButton primaryButtonHosts"
            onClick={this.falseAddHost}
          >
            Dodaj hosta
          </button>
        </Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Urządzenie</th>
              <th>Opis</th>
              <th>Lokalizacja</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {this.props.hostList.map((data, index) => {
              return (
                <tr key={index}>
                  <th>{data.name}</th>
                  <th>{data.description}</th>
                  <th>{data.localization}</th>
                  <th>
                    <span>
                      <button
                        className="transparent"
                        onClick={() => this.editHost(data)}
                      >
                        <EditIcon className="iconButton" />
                      </button>
                      <button
                        className="transparent"
                        onClick={() => this.deleteHost(data.id)}
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

const mapStateToProps = ({ hostReducer }) => ({
  isAddingHosts: hostReducer.isAddingHosts,
  addingHostFailure: hostReducer.addingHostFailure,
  addedHost: hostReducer.addedHost,
  hostList: hostReducer.hosts,
  hostNameList: hostReducer.hostName,
  ifEditHost: hostReducer.ifEditHost
});

export default connect(mapStateToProps)(HostsViewPart);
