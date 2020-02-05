import * as React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "../../static/hostAddToRack.css";
import {
  deleteEditHostRack,
  addHostToRack,
  editHostInRack
} from "../../actions/rack";

class HostAddToRackPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      position: "",
      size: "",
      host: { name: "", id: "" },
      hostsSelectList: []
    };
  }

  deleteEditHostRackFun() {
    this.props.dispatch(deleteEditHostRack());
  }

  changeHost(e) {
    var hostID = e.target.value;
    if (hostID === "") {
      this.setState({
        id: "",
        name: ""
      });
      return;
    }
    var host = this.props.hosts.find(x => x.id === hostID);
    this.setState({
      id: host.id,
      name: host.name
    });
  }

  changePosition(e) {
    var pos = e.target.value;
    if (pos < 0) {
      pos = 0;
    }
    this.setState({ position: pos });
  }

  changeSize(e) {
    var size = e.target.value;
    if (size < 0) {
      size = 0;
    }
    this.setState({ size: size });
  }

  handleEdition = () => {
    if (!this.validateForm()) {
      return;
    }
    var host = {
      id: this.state.id,
      name: this.state.name,
      position: this.state.position,
      size: this.state.size
    };
    this.props.dispatch(
      editHostInRack(this.props.detailRack, host, this.state.oldPos)
    );
    this.props.dispatch(deleteEditHostRack());
  };

  handleSubmit = () => {
    if (!this.validateForm()) {
      return;
    }
    var host = {
      id: this.state.id,
      size: this.state.size,
      name: this.state.name,
      position: this.state.position
    };
    this.props.dispatch(addHostToRack(this.props.detailRack, host));
  };

  validateForm() {
    var { name, position, size } = this.state;
    var rackSize = this.props.detailRack.size;
    var rackHosts = this.props.detailRack.hosts;
    if (name === "" || position === "" || size === "") {
      this.setState({
        formError: true,
        formErrorMes: "Formularz nie może zawierać pustych miejsc"
      });
      return false;
    } else if (
      parseInt(position, 10) + parseInt(size, 10) - 1 >
      parseInt(rackSize, 10)
    ) {
      this.setState({
        formError: true,
        formErrorMes: "Urządzenie nie mieści się w szafie"
      });
      return false;
    } else {
      var occupiedIndex = [];
      for (var i = 0; i < rackHosts.length; i++) {
        var pos = parseInt(rackHosts[i].position, 10);
        var rackHostSize = parseInt(rackHosts[i].size, 10);
        for (var j = parseInt(pos, 10); j <= rackHostSize; j++) {
          occupiedIndex.push(j);
        }
      }
      var tryToOccupyIndex = [];
      var q, w;
      if (parseInt(position, 10) > parseInt(size, 10)) {
        w = parseInt(position, 10);
        q = parseInt(size, 10);
      } else {
        w = parseInt(size, 10);
        q = parseInt(position, 10);
      }
      for (var k = q; k <= w; k++) {
        tryToOccupyIndex.push(k);
      }
      for (var t = 0; t < occupiedIndex.length; t++) {
        for (var o = 0; o < tryToOccupyIndex.length; o++) {
          if (occupiedIndex[t] === tryToOccupyIndex[o]) {
            this.setState({
              formError: true,
              formErrorMes: "Urządzenie wchodzi na zajęte już miejsce"
            });
            return false;
          }
        }
      }
      return true;
    }
  }

  componentDidMount() {
    var hostSelectList = [{ id: "", name: "" }];
    this.props.hosts.forEach(function(host) {
      hostSelectList.push(host);
    });
    this.setState({
      hostsSelectList: hostSelectList
    });
    var ifEdit = this.props.ifEditDetailHost;
    if (ifEdit) {
      var { detailHost } = this.props;
      this.setState({
        id: detailHost.id,
        name: detailHost.name,
        size: detailHost.size,
        position: detailHost.position,
        oldPos: detailHost.position
      });
    }
  }

  render() {
    if (this.props.hostAdded) {
      return <Redirect to="/racksdetails" />;
    }
    return (
      <div className="hostRack">
        {(this.props.ifEditDetailHost && (
          <div className="mainText mainTextHostRack">Edytuj hosta</div>
        )) || <div className="mainText mainTextHostRack">Dodaj hosta</div>}
        <div className="form formHostRackAdd">
          <div className="inputDiv inputDivHostsAdd">
            <label className="formLabel formLabelHostsAdd">Nazwa Hosta:</label>
            <select
              className="formInput formInputHostsAdd"
              type="text"
              onChange={e => this.changeHost(e)}
              value={this.state.id}
            >
              {this.state.hostsSelectList.map((host, index) => {
                return (
                  <option key={index} value={host.id}>
                    {host.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="inputDiv inputDivHostsAdd">
            <label className="formLabel formLabelHostsAdd">Pozycja:</label>
            <input
              className="formInput formInputHostsAdd"
              type="number"
              onChange={e => this.changePosition(e)}
              value={this.state.position}
            />
          </div>
          <div className="inputDiv inputDivHostsAdd">
            <label className="formLabel formLabelHostsAdd">Rozmiar:</label>
            <input
              className="formInput formInputHostsAdd"
              type="number"
              onChange={e => this.changeSize(e)}
              value={this.state.size}
            />
          </div>
          {this.state.formError && (
            <center>
              <p className="errorTextHostsAdd">{this.state.formErrorMes}</p>
            </center>
          )}
          <div className="buttonRowHostsAdd">
            <Link
              onClick={() => this.deleteEditHostRackFun()}
              className="secondaryButtonLinkHostsAdd"
              to="/racksdetails"
            >
              <button className="secondaryButton secondaryButtonHostsAdd">
                Cofnij
              </button>
            </Link>
            {(this.props.ifEditDetailHost && (
              <button
                onClick={this.handleEdition}
                className="primaryButton primaryButtonHostsAdd"
              >
                Edytuj
              </button>
            )) || (
              <button
                onClick={this.handleSubmit}
                className="primaryButton primaryButtonHostsAdd"
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

const mapStateToProps = ({ rackReducer, hostReducer }) => ({
  ifEditDetailHost: rackReducer.ifEditDetailHost,
  detailHost: rackReducer.detailHost,
  detailRack: rackReducer.detailsRack,
  hosts: hostReducer.hosts,
  hostAdded: rackReducer.hostAddedToRack
});

export default connect(mapStateToProps)(HostAddToRackPart);
