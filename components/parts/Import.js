import React from "react";
import { connect } from "react-redux";
import "../../static/import.css";
import { db } from "../../firebase/firebase";
import { Redirect } from "react-router";

class Import extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      redirect: false
    };
  }

  newFile(e) {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsText(files[0]);
    reader.onload = e => {
      this.setState({ content: e.target.result });
    };
  }

  async submitForm(e) {
    e.preventDefault();
    this.setData(this.state.content);
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="Import">
        <div className="mainText mainTextImport">Import bazy z pliku:</div>
        <form className="form formImport" onSubmit={e => this.submitForm(e)}>
          <div className="inputDiv inputDivImport">
            <label className="formLabel formLabelImport">
              Plik do wczytania:
            </label>
            <input
              type="file"
              id="file"
              className="inputFileImport"
              accept=".json"
              onChange={e => this.newFile(e)}
            />
          </div>
          <div className="buttonRowImport">
            <button type="submit" className="primaryButton primaryButtonImport">
              Import
            </button>
          </div>
        </form>
      </div>
    );
  }

  delData = () => {
    db.collection("hosts")
      .get()
      .then(res => {
        res.forEach(element => {
          element.ref.delete();
        });
      });

    db.collection("nats")
      .get()
      .then(res => {
        res.forEach(element => {
          element.ref.delete();
        });
      });

    db.collection("networks")
      .get()
      .then(res => {
        res.forEach(element => {
          element.ref.delete();
        });
      });

    db.collection("racks")
      .get()
      .then(res => {
        res.forEach(element => {
          element.ref.delete();
        });
      });

    db.collection("vlans")
      .get()
      .then(res => {
        res.forEach(element => {
          element.ref.delete();
        });
      });
  };

  setData = data => {
    let jsonData = JSON.parse(data);
    for (let host of jsonData.host) {
      db.collection("hosts")
        .doc(host.id)
        .set({
          name: host.name,
          description: host.description,
          localization: host.localization
        });
    }
    for (let nat of jsonData.nat) {
      db.collection("nats")
        .doc(nat.id)
        .set({
          outerIP: nat.outerIP,
          network: nat.network,
          name: nat.name,
          device: nat.device
        });
    }

    for (let network of jsonData.network) {
      db.collection("networks")
        .doc(network.id)
        .set({
          address: network.address,
          description: network.description,
          zone: network.zone,
          vlan: network.vlan,
          assign: network.assign,
          dns: network.dns,
          routable: network.routable,
          hosts: network.hosts
        });
    }
    for (let vlan of jsonData.vlan) {
      db.collection("vlans")
        .doc(vlan.id)
        .set({
          name: vlan.name,
          description: vlan.description,
          network: vlan.network
        });
    }
    for (let rack of jsonData.rack) {
      db.collection("racks")
        .doc(rack.id)
        .set({
          name: rack.name,
          description: rack.description,
          localization: rack.localization,
          size: rack.size,
          hosts: rack.hosts
        });
    }
  };
}

const mapDispatchToProps = dispatch => ({
  clearData: data => dispatch(clearAll(data))
});

export default connect(
  null,
  mapDispatchToProps
)(Import);
