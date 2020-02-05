import * as React from "react";
import Menu from "../parts/Menu";
import HeaderMenu from "../parts/HeaderMenu";
import { connect } from "react-redux";
import { setHost } from "../../actions/firebase";
import { setVLAN } from "../../actions/vlan";
import { setNAT } from "../../actions/nat";
import { setNetwork } from "../../actions/network";
import { setRack } from "../../actions/rack";

export class Main extends React.Component {
  componentDidUpdate() {
    this.props.setList();
    this.props.setVLANList();
    this.props.setNATList();
    this.props.setNetworkList();
    this.props.setRack();
  }

  componentDidMount() {
    this.props.setList();
    this.props.setVLANList();
    this.props.setNATList();
    this.props.setNetworkList();
    this.props.setRack();
  }

  render() {
    return (
      <div>
        <div className="titleRow">
          <HeaderMenu tab={"Start"} />
        </div>
        <div className="menuBGRow">
          <Menu />
          <div className="mainText mainPageTitle">IP Manager</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setList: () => dispatch(setHost()),
  setVLANList: () => dispatch(setVLAN()),
  setNATList: () => dispatch(setNAT()),
  setNetworkList: () => dispatch(setNetwork()),
  setRack: () => dispatch(setRack())
});

export default connect(
  null,
  mapDispatchToProps
)(Main);
