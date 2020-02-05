import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "../../static/export.css";

class Export extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: ""
    };
  }

  handleSubmit = () => {
    let finalData = {
      host: this.props.hostList,
      nat: this.props.natList,
      network: this.props.networkList,
      vlan: this.props.vlanList,
      rack: this.props.rackList
    };
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(finalData, null, 2)], {
      type: "application/json"
    });
    element.href = URL.createObjectURL(file);
    element.download = this.state.filename + ".json";
    document.body.appendChild(element);
    element.click();
  };

  changeFilename = e => {
    this.setState({ filename: e.target.value });
  };

  render() {
    return (
      <div className="Export">
        <div className="mainText mainTextExport">Export bazy do pliku:</div>
        <div className="form formExport">
          <div className="inputDiv inputDivExport">
            <label className="formLabel formLabelExport">
              Nazwa pliku json:
            </label>
            <input
              className="formInput formInputExport"
              type="text"
              onChange={e => this.changeFilename(e)}
            />
          </div>
          <div className="buttonRowExport">
            <button
              onClick={this.handleSubmit}
              className="primaryButton primaryButtonExport"
            >
              Export
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  natReducer,
  hostReducer,
  networkReducer,
  vlanReducer,
  rackReducer
}) => ({
  natList: natReducer.nats,
  hostList: hostReducer.hosts,
  networkList: networkReducer.networks,
  vlanList: vlanReducer.vlans,
  rackList: rackReducer.racks
});
export default connect(mapStateToProps)(Export);
